
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Cloud, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-gradient text-white py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="hidden md:block absolute top-40 left-20 animate-float">
        <Cloud className="text-white/10 w-16 h-16" />
      </div>
      <div className="hidden md:block absolute bottom-40 right-20 animate-float" style={{animationDelay: "2s"}}>
        <Star className="text-white/10 w-10 h-10" />
      </div>
      
      <div className="container mx-auto px-6 md:px-8 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center px-3 py-1 mb-8 border border-white/20 rounded-full bg-white/5 backdrop-blur">
          <span className="text-accent mr-2">✨</span>
          <span className="text-sm font-medium">Trusted by 10,000+ pilots worldwide</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
          Your Digital 
          <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent"> Pilot </span> 
          Logbook
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mb-12">
          Track your flights, monitor your hours, and advance your flying career
          with the most comprehensive digital logbook built for pilots, by pilots.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 shadow-lg shadow-primary/30 hover:shadow-primary/40"
            >
              Start For Free <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <a href="#features">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8"
            >
              Explore Features
            </Button>
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { text: "Easy flight logging", icon: <CheckCircle className="text-accent" /> },
            { text: "Detailed statistics", icon: <CheckCircle className="text-accent" /> },
            { text: "Professional PDF exports", icon: <CheckCircle className="text-accent" /> }
          ].map((feature, index) => (
            <div key={index} className="flex items-center justify-center gap-2 py-2 px-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
              {feature.icon}
              <span className="font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
