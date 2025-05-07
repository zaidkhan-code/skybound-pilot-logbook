
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-900 text-white/80 py-16">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                  <path d="M2 22h20"></path>
                  <path d="M12 11l-8.29 4.44c-.8.43-1.15.99-.64 1.79.51.8 1.51.92 2.31.49L12 15"></path>
                  <path d="M8.5 8.5 12 11l8.29-4.44c.8-.43 1.15-.99.64-1.79-.51-.8-1.51-.92-2.31-.49L12 7"></path>
                  <path d="m12 11 2.5-2.5"></path>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">SkyBound</span>
            </Link>
            <p className="mb-4">
              Your complete digital solution for flight logging and career tracking.
            </p>
            <p className="text-sm">
              &copy; {currentYear} SkyBound. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><Link to="/login" className="hover:text-white">Log In</Link></li>
              <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
