
import { BarChart3, Calendar, Clock, FileTextIcon, MapPin, PlaneTakeoff } from "lucide-react";

const features = [
  {
    icon: <PlaneTakeoff className="h-8 w-8 text-primary" />,
    title: "Comprehensive Flight Logging",
    description: "Log every detail of your flights from aircraft type to route information with our intuitive flight entry system."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "Advanced Statistics",
    description: "Track your progress with detailed charts and statistics to visualize your flight experience and identify trends."
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: "Airport Database",
    description: "Access comprehensive airport information globally with our integrated database that auto-completes as you type."
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Flight History",
    description: "Browse, filter, and search your complete flight history with our powerful querying tools."
  },
  {
    icon: <FileTextIcon className="h-8 w-8 text-primary" />,
    title: "Professional PDF Export",
    description: "Generate professional-grade PDF logbooks that are ready for submission to airlines or regulatory authorities."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Time Tracking",
    description: "Automatically calculate flight hours, night time, instrument time, and more to keep your records accurate."
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Powerful Features for Every Pilot</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to track, analyze, and showcase your flight experience in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-lg p-6 card-hover"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
