
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-gradient text-white py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
          Your Digital Pilot Logbook
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mb-8">
          Track your flights, monitor your hours, and advance your flying career with the most 
          comprehensive digital logbook built for pilots, by pilots.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start For Free
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Explore Features
            </Button>
          </a>
        </div>
        
        <div className="mt-16 w-full max-w-4xl relative">
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
          <img 
            src="/placeholder.svg" 
            alt="SkyBound Dashboard" 
            className="w-full rounded-xl shadow-2xl border border-white/20 relative z-10"
          />
        </div>
      </div>
    </section>
  );
}
