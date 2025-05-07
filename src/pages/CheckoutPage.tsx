
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Calendar, Check, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get plan details from URL params
  const searchParams = new URLSearchParams(location.search);
  const planName = searchParams.get('plan') || 'premium';
  
  const planDetails = {
    name: 'Premium',
    price: '$9.99',
    period: 'month',
    features: [
      "Unlimited flight logging",
      "Advanced statistics & insights",
      "Custom fields configuration",
      "Professional PDF exports",
      "Priority support",
      "Automatic backups",
      "CSV/Excel import & export",
    ]
  };
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Save premium status to localStorage
      localStorage.setItem('isPremium', 'true');
      localStorage.setItem('isAuthenticated', 'true');
      
      toast({
        title: "Payment successful!",
        description: "Your premium subscription is now active.",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
        <header className="py-4 px-6 border-b">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="font-bold text-2xl flex items-center gap-2">
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded">Sky</span>
              <span>Bound</span>
            </Link>
            
            <Link to="/login" className="text-muted-foreground hover:text-foreground">
              Back to Login
            </Link>
          </div>
        </header>
        
        <main className="flex-1 container max-w-4xl mx-auto py-12 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Complete Your Purchase</h1>
            <p className="text-muted-foreground mt-2">You're just one step away from unlocking premium features</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-6">
              <Card className="border-primary/25">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter your payment information securely</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Card Number</label>
                    <div className="flex items-center border rounded-md px-3 py-2 bg-background shadow-sm">
                      <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="4242 4242 4242 4242" 
                        className="flex-1 bg-transparent outline-none"
                        defaultValue="4242 4242 4242 4242"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expiration Date</label>
                      <div className="flex items-center border rounded-md px-3 py-2 bg-background shadow-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className="flex-1 bg-transparent outline-none"
                          defaultValue="12/25"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CVC</label>
                      <div className="flex items-center border rounded-md px-3 py-2 bg-background shadow-sm">
                        <input 
                          type="text" 
                          placeholder="123" 
                          className="flex-1 bg-transparent outline-none"
                          defaultValue="123"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name on Card</label>
                    <div className="flex items-center border rounded-md px-3 py-2 bg-background shadow-sm">
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="flex-1 bg-transparent outline-none"
                        defaultValue="John Doe"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handlePayment} 
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay ${planDetails.price}`}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>This is a demo checkout. No actual payment will be processed.</p>
                <p className="mt-1">In a production environment, this would securely process payments via Stripe or another provider.</p>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Card className="border-primary sticky top-6">
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{planDetails.name} Plan</h3>
                      <p className="text-sm text-muted-foreground">Monthly subscription</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{planDetails.price}</p>
                      <p className="text-xs text-muted-foreground">per {planDetails.period}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 my-6">
                    {planDetails.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>{planDetails.price}/{planDetails.period}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
