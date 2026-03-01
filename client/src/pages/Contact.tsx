import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We will get back to you shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif mb-4">Contact Us</h1>
            <p className="text-muted-foreground font-light">Have questions about your visit? We're here to help.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary h-fit">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">Email Us</h3>
                  <p className="text-muted-foreground font-light">General Inquiries: info@khajurahoheritage.org</p>
                  <p className="text-muted-foreground font-light">Tour Support: tours@khajurahoheritage.org</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary h-fit">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">Call Us</h3>
                  <p className="text-muted-foreground font-light">Helpline: +91 7686 274051</p>
                  <p className="text-muted-foreground font-light">Tourist Office: +91 7686 274406</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary h-fit">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">Visit Us</h3>
                  <p className="text-muted-foreground font-light">Tourist Information Centre,</p>
                  <p className="text-muted-foreground font-light">Khajuraho, Madhya Pradesh 471606</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-3xl shadow-xl border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Name</label>
                    <Input placeholder="Your Name" className="bg-background" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Email</label>
                    <Input type="email" placeholder="Email Address" className="bg-background" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Subject</label>
                  <Input placeholder="What is this about?" className="bg-background" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[150px] bg-background" required />
                </div>
                <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Send className="w-4 h-4" /> Send Message
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
