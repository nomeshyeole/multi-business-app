import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, MapPin, Star, Phone, Mail, CheckCircle } from "lucide-react";

export default function SportsTurf() {
  const services = [
    {
      name: "Football Turf Booking",
      duration: "90 minutes",
      price: "₹2,500",
      capacity: "22 players",
      features: ["Professional FIFA standard turf", "Floodlights for night play", "Changing rooms", "First aid facility"]
    },
    {
      name: "Cricket Turf Booking",
      duration: "3 hours",
      price: "₹3,000",
      capacity: "22 players",
      features: ["Professional cricket pitch", "Bowling machine available", "Scoreboard", "Umpire on request"]
    },
    {
      name: "Multi-purpose Court",
      duration: "60 minutes",
      price: "₹1,500",
      capacity: "10-12 players",
      features: ["Basketball court markings", "Volleyball net available", "Badminton court setup", "Equipment storage"]
    },
    {
      name: "Training Sessions",
      duration: "2 hours",
      price: "₹4,500",
      capacity: "15 players",
      features: ["Professional coach included", "Training equipment provided", "Video analysis", "Performance tracking"]
    }
  ];

  const facilities = [
    "FIFA standard artificial turf",
    "Advanced drainage system",
    "Professional floodlighting",
    "CCTV security coverage",
    "Parking for 50+ vehicles",
    "Cafeteria and refreshments",
    "Clean washrooms and changing rooms",
    "Equipment rental available"
  ];

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/services">
            <Button variant="ghost" className="mb-4 text-primary hover:text-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />Back to Services
            </Button>
          </Link>
          
          <div className="relative h-64 rounded-xl overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Sports turf facility" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Sports Turf Facilities</h1>
                <p className="text-xl">Professional grade artificial turf for all sports</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Services & Pricing */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Services & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-lg text-secondary">{service.name}</h3>
                          <Badge variant="secondary" className="bg-accent text-white">{service.price}</Badge>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="mr-2 h-4 w-4" />
                            <span>{service.capacity}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="mr-2 h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Facilities & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">Sports Complex, Sector 15</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-sm text-gray-600">6:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="mr-3 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Rating</p>
                    <p className="text-sm text-gray-600">4.8/5 (120+ reviews)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Book Now</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-primary hover:bg-blue-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Call: +91-9876543210
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Inquiry
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Advance booking required. 24-hour cancellation policy applies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}