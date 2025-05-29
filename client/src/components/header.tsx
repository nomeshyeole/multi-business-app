import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Building, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Building className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary">Babuji Business Corporation</h1>
              <p className="text-sm text-gray-600">Excellence in Business Services</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <Button 
                variant="ghost" 
                className={`font-medium ${location === '/' ? 'text-primary' : 'text-secondary hover:text-primary'}`}
              >
                Home
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                variant="ghost" 
                className={`font-medium ${location === '/services' ? 'text-primary' : 'text-secondary hover:text-primary'}`}
              >
                Services
              </Button>
            </Link>
            <Button variant="ghost" className="text-secondary hover:text-primary font-medium">
              About
            </Button>
            <Button variant="ghost" className="text-secondary hover:text-primary font-medium">
              Contact
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="md:hidden text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="text-xl" />
          </Button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-2">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                  Home
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                  Services
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                About
              </Button>
              <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                Contact
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
