
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Essential features for hobby pilots",
    features: [
      "Track up to 25 flights",
      "Basic flight statistics",
      "Aircraft & airport database",
      "PDF export (watermarked)",
      "Mobile-friendly interface",
    ],
    limitations: ["Limited to 25 flights", "No advanced statistics", "Basic PDF export only"],
    cta: "Start Free",
    ctaLink: "/signup",
    popular: false,
  },
  {
    name: "Premium",
    price: "9.99",
    description: "Professional tools for serious pilots",
    features: [
      "Unlimited flight logging",
      "Advanced statistics & insights",
      "Custom fields configuration",
      "Professional PDF exports",
      "Priority support",
      "Automatic backups",
      "CSV/Excel import & export",
    ],
    limitations: [],
    cta: "Get Premium",
    ctaLink: "/checkout?plan=premium",
    popular: true,
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your flying career.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-card border rounded-xl overflow-hidden transition-all ${
                plan.popular ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== "0" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to={plan.ctaLink}>
                  <Button 
                    className={`w-full ${plan.popular ? '' : 'bg-primary/80 hover:bg-primary'}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
