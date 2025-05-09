
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-blue-700 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Transform Your Flight Logging Experience?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
            Join thousands of pilots who trust SkyBound for their flight logging
            needs. Get started today with our free tier or unlock premium features.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-lg shadow-primary/20 text-lg px-8"
              >
                Start For Free <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/checkout">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 text-lg px-8"
              >
                Go Premium
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 py-3 px-4 rounded-lg bg-white/10 inline-flex items-center backdrop-blur-sm border border-white/10">
            <span className="text-sm font-medium">Satisfaction guaranteed — 30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
