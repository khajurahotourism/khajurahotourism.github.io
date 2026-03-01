import { MapPin, Calendar, Clock, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import img4 from "@/assets/images/gallery_4.jpg";

export function VisitorInfo() {
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Successfully Subscribed!",
      description: "We'll send you updates and travel tips for Khajuraho.",
    });
  };

  return (
    <section id="visitor-info" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 hidden lg:block">
         <img src={img4} alt="Carving Detail" className="w-full h-full object-cover mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl text-foreground mb-8">Plan Your Visit</h2>
            <p className="text-muted-foreground text-lg font-light mb-12">
              Located in the Chhatarpur district of Madhya Pradesh, Khajuraho is well-connected by air, train, and road.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <Card className="bg-background/80 backdrop-blur border-none shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">Timings</h4>
                    <p className="text-sm text-muted-foreground">Sunrise to Sunset<br/>(Open all days)</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur border-none shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">Best Time</h4>
                    <p className="text-sm text-muted-foreground">October to February<br/>(Pleasant weather)</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur border-none shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">Entry Fee</h4>
                    <p className="text-sm text-muted-foreground">₹40 for Indians<br/>₹600 for Foreigners</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur border-none shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">Light & Sound</h4>
                    <p className="text-sm text-muted-foreground">Every evening in<br/>English & Hindi</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border/50">
            <h3 className="text-2xl font-serif mb-4 text-foreground">Get the official Guidebook</h3>
            <p className="text-muted-foreground mb-8 font-light">Sign up to receive a free digital guidebook containing detailed maps, history, and walking routes for the Western Group of Temples.</p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  className="bg-background border-border h-12 text-lg focus-visible:ring-primary"
                  data-testid="input-email-subscribe"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-submit-subscribe">
                Send me the Guidebook
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
