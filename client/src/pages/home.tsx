import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Rocket, Award, Users, Clock, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Professional business office environment background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Modern business office environment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Excellence in 
              <span className="text-yellow-300"> Business Services</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
              From premium recreational facilities to essential business services, 
              Multi Business Corporation delivers quality experiences across multiple sectors.
            </p>
            <Link href="/services">
              <Button 
                size="lg"
                className="bg-accent hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Enjoy Our Services
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Why Choose Multi Business Corporation?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to providing exceptional quality service with a customer-first approach
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Quality Assurance</h3>
              <p className="text-gray-600">Premium quality services with attention to detail in every aspect of our business operations.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Customer Focused</h3>
              <p className="text-gray-600">Your satisfaction is our priority with personalized service and dedicated customer support.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Reliable Service</h3>
              <p className="text-gray-600">Consistent, dependable service delivery with flexible hours to meet your business needs.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
