
import { Award, CloudLightning, Compass, Shield } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center px-3 py-1 mb-4 border border-primary/20 rounded-full bg-primary/5 text-primary">
              <span className="text-sm font-medium">Our Mission</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              The Story Behind SkyBound
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              SkyBound was created by pilots who understand the challenges of
              maintaining accurate flight records. We've experienced the
              frustration of paper logbooks and inadequate digital solutions
              firsthand.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our mission is to provide pilots with the most intuitive,
              comprehensive, and reliable logbook solution available. Whether
              you're a student pilot just starting your journey or an
              experienced captain with thousands of hours, SkyBound is designed
              to meet your needs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: "Data Security",
                  description: "Your flight data is protected with enterprise-grade encryption"
                },
                {
                  icon: <Award className="h-8 w-8 text-primary" />,
                  title: "Regulatory Compliance",
                  description: "Built to meet FAA, EASA and other aviation authorities requirements"
                },
                {
                  icon: <CloudLightning className="h-8 w-8 text-primary" />,
                  title: "Instant Sync",
                  description: "Access your logbook across all your devices"
                },
                {
                  icon: <Compass className="h-8 w-8 text-primary" />,
                  title: "Pilot-First Design",
                  description: "Intuitive interface designed by pilots, for pilots"
                }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="mt-1 p-2 rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
            
            <div className="relative bg-gradient-to-br from-card/80 to-card backdrop-blur-sm p-1 rounded-2xl shadow-xl border border-border">
              <div className="rounded-xl overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col justify-center items-center p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30 mb-6">
                    <path d="M2 22h20"></path>
                    <path d="M12 11l-8.29 4.44c-.8.43-1.15.99-.64 1.79.51.8 1.51.92 2.31.49L12 15"></path>
                    <path d="M8.5 8.5 12 11l8.29-4.44c.8-.43 1.15-.99.64-1.79-.51-.8-1.51-.92-2.31-.49L12 7"></path>
                    <path d="m12 11 2.5-2.5"></path>
                  </svg>
                  <div className="text-center">
                    <h3 className="text-3xl font-display font-bold mb-2 text-primary">SkyBound</h3>
                    <p className="text-lg text-muted-foreground">Digital Logbook Solution</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-lg"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
