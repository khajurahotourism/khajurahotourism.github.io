import { useLocation } from "wouter";

const NAV_OFFSET = 110;
const MAX_SCROLL_RETRIES = 20;

function scrollToSection(sectionId: string): boolean {
  const target = document.getElementById(sectionId);
  if (!target) {
    return false;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

function scrollToSectionWhenReady(sectionId: string) {
  let attempt = 0;

  const run = () => {
    attempt += 1;
    const done = scrollToSection(sectionId);
    if (!done && attempt < MAX_SCROLL_RETRIES) {
      window.setTimeout(run, 80);
    }
  };

  run();
}

export function useSectionNav() {
  const [location, setLocation] = useLocation();

  const goToSection = (sectionId: string) => {
    const hashPath = `/#${sectionId}`;

    if (location !== "/") {
      setLocation("/");
      window.setTimeout(() => {
        window.history.replaceState(null, "", hashPath);
        scrollToSectionWhenReady(sectionId);
      }, 40);
      return;
    }

    window.history.replaceState(null, "", hashPath);
    scrollToSectionWhenReady(sectionId);
  };

  return { goToSection };
}

export function scrollToHashSection() {
  const hash = window.location.hash.replace("#", "").trim();
  if (!hash) {
    return;
  }

  scrollToSectionWhenReady(hash);
}
