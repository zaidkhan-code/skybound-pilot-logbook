
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-6 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Start Logging?</h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Join thousands of pilots who trust SkyBound for their flight logging needs.
          Get started for free today!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start For Free
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
