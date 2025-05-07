
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-6 md:px-8 lg:px-12 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <path d="M2 22h20"></path>
              <path d="M12 11l-8.29 4.44c-.8.43-1.15.99-.64 1.79.51.8 1.51.92 2.31.49L12 15"></path>
              <path d="M8.5 8.5 12 11l8.29-4.44c.8-.43 1.15-.99.64-1.79-.51-.8-1.51-.92-2.31-.49L12 7"></path>
              <path d="m12 11 2.5-2.5"></path>
            </svg>
          </div>
          <span className="text-lg md:text-xl font-bold">SkyBound</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground/80 hover:text-foreground font-medium">Features</a>
          <a href="#pricing" className="text-foreground/80 hover:text-foreground font-medium">Pricing</a>
          <a href="#about" className="text-foreground/80 hover:text-foreground font-medium">About Us</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-4 shadow-lg z-50 animate-fade-in">
          <div className="flex flex-col space-y-4 p-2">
            <a href="#features" className="text-foreground/80 hover:text-foreground font-medium py-2" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground font-medium py-2" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="#about" className="text-foreground/80 hover:text-foreground font-medium py-2" onClick={() => setIsMenuOpen(false)}>About Us</a>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Log In</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
