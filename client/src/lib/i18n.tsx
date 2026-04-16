import * as React from "react";
import {
  translations,
  type LanguageCode,
  type TranslationKey,
} from "@/lib/translations";

type LanguageGroup = "international" | "indian";

type LanguageDictionary = Partial<Record<TranslationKey, string>>;
type AutoTranslations = Partial<Record<LanguageCode, LanguageDictionary>>;

export interface LanguageOption {
  code: LanguageCode;
  group: LanguageGroup;
  nativeName: string;
  flag: string;
}

export const languageOptions: LanguageOption[] = [
  { code: "en", group: "international", nativeName: "English (English)", flag: "US" },
  { code: "es", group: "international", nativeName: "Spanish (Español)", flag: "ES" },
  { code: "fr", group: "international", nativeName: "French (Français)", flag: "FR" },
  { code: "de", group: "international", nativeName: "German (Deutsch)", flag: "DE" },
  { code: "it", group: "international", nativeName: "Italian (Italiano)", flag: "IT" },
  { code: "ru", group: "international", nativeName: "Russian (Русский)", flag: "RU" },
  { code: "zh", group: "international", nativeName: "Chinese (中文)", flag: "ZH" },
  { code: "ja", group: "international", nativeName: "Japanese (日本語)", flag: "JA" },
  { code: "ar", group: "international", nativeName: "Arabic (العربية)", flag: "AR" },
  { code: "hi", group: "indian", nativeName: "Hindi (हिंदी)", flag: "IN" },
  { code: "ta", group: "indian", nativeName: "Tamil (தமிழ்)", flag: "IN" },
  { code: "te", group: "indian", nativeName: "Telugu (తెలుగు)", flag: "IN" },
  { code: "bn", group: "indian", nativeName: "Bangla (বাংলা)", flag: "IN" },
  { code: "gu", group: "indian", nativeName: "Gujarati (ગુજરાતી)", flag: "IN" },
  { code: "ml", group: "indian", nativeName: "Malayalam (മലയാളം)", flag: "IN" },
  { code: "as", group: "indian", nativeName: "Assamese (অসমীয়া)", flag: "IN" },
  { code: "ks", group: "indian", nativeName: "Kashmiri (کشمیری)", flag: "IN" },
];

const STORAGE_KEY = "khajuraho_language";
const AUTO_TRANSLATION_STORAGE_KEY = "khajuraho_auto_translations_v2";
const DEFAULT_LANGUAGE: LanguageCode = "en";
const ENGLISH_KEYS = Object.keys(translations.en) as TranslationKey[];
const RTL_LANGUAGES = new Set<LanguageCode>(["ar", "ks"]);

const GOOGLE_TARGET_BY_LANGUAGE: Partial<Record<LanguageCode, string>> = {
  zh: "zh-CN",
  ks: "ur",
};

type TranslateParams = Record<string, string | number>;

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey, params?: TranslateParams) => string;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;

  return Object.entries(params).reduce((acc, [paramKey, value]) => {
    return acc.replaceAll(`{${paramKey}}`, String(value));
  }, template);
}

function isLanguageCode(value: string): value is LanguageCode {
  return value in translations;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function loadAutoTranslations(): AutoTranslations {
  if (typeof window === "undefined") return {};

  try {
    const rawValue = window.localStorage.getItem(AUTO_TRANSLATION_STORAGE_KEY);
    if (!rawValue) return {};

    const parsed = JSON.parse(rawValue) as unknown;
    if (!isPlainObject(parsed)) return {};

    const sanitized: AutoTranslations = {};

    for (const [languageKey, dictionary] of Object.entries(parsed)) {
      if (!isLanguageCode(languageKey) || !isPlainObject(dictionary)) {
        continue;
      }

      const cleanedDictionary: LanguageDictionary = {};

      for (const [translationKey, value] of Object.entries(dictionary)) {
        if (translationKey in translations.en && typeof value === "string") {
          cleanedDictionary[translationKey as TranslationKey] = value;
        }
      }

      if (Object.keys(cleanedDictionary).length > 0) {
        sanitized[languageKey] = cleanedDictionary;
      }
    }

    return sanitized;
  } catch {
    return {};
  }
}

function getGoogleTargetLanguage(language: LanguageCode): string {
  return GOOGLE_TARGET_BY_LANGUAGE[language] ?? language;
}

function protectPlaceholders(text: string): {
  safeText: string;
  placeholders: string[];
} {
  const placeholders = text.match(/\{[a-zA-Z0-9_]+\}/g) ?? [];

  const safeText = placeholders.reduce((currentText, placeholder, index) => {
    return currentText.replaceAll(placeholder, `__KHJ_PH_${index}__`);
  }, text);

  return { safeText, placeholders };
}

function restorePlaceholders(text: string, placeholders: string[]): string {
  return placeholders.reduce((currentText, placeholder, index) => {
    return currentText.replaceAll(`__KHJ_PH_${index}__`, placeholder);
  }, text);
}

async function translateTextsViaApi(
  texts: string[],
  targetLanguage: string,
): Promise<Array<string | null>> {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        targetLanguage,
        texts,
      }),
    });

    if (!response.ok) {
      return texts.map(() => null);
    }

    const payload = (await response.json()) as {
      translations?: unknown;
    };

    const translatedValues = payload.translations;

    if (!Array.isArray(translatedValues)) {
      return texts.map(() => null);
    }

    return texts.map((_, index) => {
      const value = translatedValues[index];
      return typeof value === "string" ? value : null;
    });
  } catch {
    return texts.map(() => null);
  }
}

async function translateMissingKeys(
  language: LanguageCode,
  missingKeys: TranslationKey[],
): Promise<LanguageDictionary> {
  const targetLanguage = getGoogleTargetLanguage(language);
  const translatedDictionary: LanguageDictionary = {};
  const preparedEntries = missingKeys.map((key) => {
    const sourceText = translations.en[key];
    const { safeText, placeholders } = protectPlaceholders(sourceText);

    return {
      key,
      safeText,
      placeholders,
    };
  });

  const chunkSize = 20;

  for (let index = 0; index < preparedEntries.length; index += chunkSize) {
    const chunk = preparedEntries.slice(index, index + chunkSize);
    const chunkTexts = chunk.map((entry) => entry.safeText);
    const translatedTexts = await translateTextsViaApi(chunkTexts, targetLanguage);

    chunk.forEach((entry, chunkIndex) => {
      const translated = translatedTexts[chunkIndex];
      if (!translated) {
        return;
      }

      translatedDictionary[entry.key] = restorePlaceholders(
        translated,
        entry.placeholders,
      );
    });
  }

  return translatedDictionary;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] =
    React.useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [autoTranslations, setAutoTranslations] =
    React.useState<AutoTranslations>(() => loadAutoTranslations());
  const loadingLanguagesRef = React.useRef<Set<LanguageCode>>(new Set());

  React.useEffect(() => {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (storedValue && isLanguageCode(storedValue)) {
      setLanguageState(storedValue);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = RTL_LANGUAGES.has(language) ? "rtl" : "ltr";
  }, [language]);

  React.useEffect(() => {
    window.localStorage.setItem(
      AUTO_TRANSLATION_STORAGE_KEY,
      JSON.stringify(autoTranslations),
    );
  }, [autoTranslations]);

  React.useEffect(() => {
    if (language === "en") {
      return;
    }

    const dictionary = (translations[language] ?? translations.en) as Partial<
      Record<TranslationKey, string>
    >;
    const autoDictionary = autoTranslations[language] ?? {};

    const missingKeys = ENGLISH_KEYS.filter((key) => {
      return dictionary[key] === undefined && autoDictionary[key] === undefined;
    });

    if (missingKeys.length === 0) {
      return;
    }

    if (loadingLanguagesRef.current.has(language)) {
      return;
    }

    let cancelled = false;
    loadingLanguagesRef.current.add(language);

    void (async () => {
      try {
        const translatedDictionary = await translateMissingKeys(language, missingKeys);

        if (cancelled || Object.keys(translatedDictionary).length === 0) {
          return;
        }

        setAutoTranslations((current) => ({
          ...current,
          [language]: {
            ...(current[language] ?? {}),
            ...translatedDictionary,
          },
        }));
      } finally {
        loadingLanguagesRef.current.delete(language);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [autoTranslations, language]);

  const setLanguage = React.useCallback((nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
  }, []);

  const t = React.useCallback(
    (key: TranslationKey, params?: TranslateParams) => {
      const dictionary = (translations[language] ?? translations.en) as Partial<
        Record<TranslationKey, string>
      >;
      const autoDictionary = autoTranslations[language] ?? {};
      const fallback = translations.en[key];
      const template = dictionary[key] ?? autoDictionary[key] ?? fallback ?? key;
      return interpolate(template, params);
    },
    [autoTranslations, language],
  );

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }

  return context;
}

