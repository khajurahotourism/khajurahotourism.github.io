import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12 border-b border-background/10 pb-12">
          <div>
            <h3 className="font-serif text-3xl font-bold text-primary mb-6 tracking-wider">KHAJURAHO</h3>
            <p className="text-background/70 font-light leading-relaxed max-w-sm">
              A tribute to human creativity, love, and spiritual devotion carved in enduring sandstone over a millennium ago.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="#about"><a className="text-background/70 hover:text-primary transition-colors">History & Legacy</a></Link></li>
              <li><Link href="#temples"><a className="text-background/70 hover:text-primary transition-colors">Temple Groups</a></Link></li>
              <li><Link href="#visitor-info"><a className="text-background/70 hover:text-primary transition-colors">Visitor Information</a></Link></li>
              <li><Link href="#"><a className="text-background/70 hover:text-primary transition-colors">Gallery</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Contact & Support</h4>
            <ul className="space-y-3 text-background/70 font-light">
              <li>Madhya Pradesh Tourism</li>
              <li>Khajuraho, Chhatarpur</li>
              <li>Madhya Pradesh 471606, India</li>
              <li className="pt-4 text-primary">info@mptourism.com</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-background/50 font-light">
          <p>© {new Date().getFullYear()} Khajuraho Heritage Documentation. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
