import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useI18n } from "@/lib/i18n";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { toast } = useToast();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!emailPattern.test(payload.email)) {
      toast({
        title: t("errors.invalid_email"),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/contact", payload);
      toast({
        title: t("contact.toast_title"),
        description: t("contact.toast_desc"),
      });
      form.reset();
    } catch {
      toast({
        title: t("errors.submit_failed"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif mb-4">{t("contact.title")}</h1>
            <p className="text-muted-foreground font-light">{t("contact.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary h-fit">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">{t("contact.email_us")}</h3>
                  <p className="text-muted-foreground font-light">
                    {t("contact.general_inquiries")}
                  </p>
                  <p className="text-muted-foreground font-light">
                    {t("contact.tour_support")}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary h-fit">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">Instagram</h3>
                  <a
                    href="https://www.instagram.com/khajuraho_city_of_temple/?hl=en"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground font-light hover:text-primary transition-colors"
                  >
                    khajuraho_city_of_temple
                  </a>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary h-fit">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">{t("contact.call_us")}</h3>
                  <p className="text-muted-foreground font-light">
                    {t("contact.helpline")}
                  </p>
                  <p className="text-muted-foreground font-light">
                    {t("contact.tourist_office")}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary h-fit">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">{t("contact.visit_us")}</h3>
                  <p className="text-muted-foreground font-light">
                    {t("contact.visit_line_1")}
                  </p>
                  <p className="text-muted-foreground font-light">
                    {t("contact.visit_line_2")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-3xl shadow-xl border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                      {t("contact.form_name")}
                    </label>
                    <Input
                      name="name"
                      placeholder={t("contact.form_name_placeholder")}
                      className="bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                      {t("contact.form_email")}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder={t("contact.form_email_placeholder")}
                      className="bg-background"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {t("contact.form_subject")}
                  </label>
                  <Input
                    name="subject"
                    placeholder={t("contact.form_subject_placeholder")}
                    className="bg-background"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {t("contact.form_message")}
                  </label>
                  <Textarea
                    name="message"
                    placeholder={t("contact.form_message_placeholder")}
                    className="min-h-[150px] bg-background"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Send className="w-4 h-4" /> {t("contact.form_submit")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
