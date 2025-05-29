import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingBag, Clock, MapPin, Phone, Mail, CheckCircle, Star, Wifi, Car } from "lucide-react";

export default function SmartMall() {
  const stores = [
    {
      category: "Fashion & Apparel",
      shops: [
        { name: "Fashion Hub", type: "Multi-brand clothing", area: "2,500 sq ft", rent: "₹1,20,000/month" },
        { name: "Shoe Palace", type: "Footwear store", area: "1,200 sq ft", rent: "₹65,000/month" },
        { name: "Accessory Zone", type: "Bags & accessories", area: "800 sq ft", rent: "₹45,000/month" }
      ]
    },
    {
      category: "Electronics & Technology",
      shops: [
        { name: "Tech World", type: "Mobile & gadgets", area: "1,800 sq ft", rent: "₹95,000/month" },
        { name: "Gaming Arena", type: "Gaming zone", area: "3,000 sq ft", rent: "₹1,50,000/month" },
        { name: "Smart Home", type: "Home automation", area: "1,500 sq ft", rent: "₹80,000/month" }
      ]
    },
    {
      category: "Food & Dining",
      shops: [
        { name: "Food Court", type: "Multi-cuisine dining", area: "5,000 sq ft", rent: "₹2,00,000/month" },
        { name: "Coffee Corner", type: "Cafe & beverages", area: "600 sq ft", rent: "₹35,000/month" },
        { name: "Ice Cream Parlor", type: "Desserts & treats", area: "400 sq ft", rent: "₹25,000/month" }
      ]
    }
  ];

  const amenities = [
    "High-speed WiFi throughout the mall",
    "Smart parking with app-based booking",
    "Digital directory and navigation",
    "Contactless payment systems",
    "24/7 security with CCTV monitoring",
    "Central air conditioning",
    "Fire safety and emergency systems",
    "Escalators and elevators",
    "Children's play area",
    "Customer service desk",
    "ATM and banking services",
    "Pharmacy and medical store"
  ];

  const packages = [
    {
      name: "Premium Retail Space",
      price: "₹1,200/sq ft",
      duration: "Monthly rent",
      features: ["Prime location", "High footfall area", "24/7 access", "Maintenance included"]
    },
    {
      name: "Standard Shop Unit",
      price: "₹800/sq ft",
      duration: "Monthly rent",
      features: ["Good visibility", "Standard amenities", "Flexible timing", "Parking space"]
    },
    {
      name: "Kiosk Space",
      price: "₹500/sq ft",
      duration: "Monthly rent",
      features: ["Entry area placement", "Quick setup", "Lower investment", "High visibility"]
    }
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
              src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Modern smart shopping mall" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Smart Mall Complex</h1>
                <p className="text-xl">Modern shopping experience with smart technology</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Rental Packages */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Rental Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {packages.map((pkg, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold text-lg text-secondary mb-2">{pkg.name}</h3>
                        <div className="mb-4">
                          <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                          <p className="text-sm text-gray-600">{pkg.duration}</p>
                        </div>
                        <div className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="mr-2 h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full mt-4 bg-primary hover:bg-blue-700">
                          Inquire Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Stores */}
            {stores.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.shops.map((shop, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <ShoppingBag className="mr-3 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-semibold text-secondary">{shop.name}</p>
                            <p className="text-sm text-gray-600">{shop.type} - {shop.area}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-accent border-accent mb-1">{shop.rent}</Badge>
                          <p className="text-xs text-gray-500">Monthly rent</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Mall Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{amenity}</span>
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
                <CardTitle className="text-xl text-secondary">Mall Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">Central Business District</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-sm text-gray-600">10:00 AM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Car className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Parking</p>
                    <p className="text-sm text-gray-600">500+ spaces available</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Wifi className="mr-3 h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Smart Features</p>
                    <p className="text-sm text-gray-600">Free WiFi & digital services</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="mr-3 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Footfall</p>
                    <p className="text-sm text-gray-600">10,000+ daily visitors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leasing Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Leasing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-secondary">Security Deposit</p>
                  <p className="text-sm text-gray-600">6 months advance rent</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-secondary">Minimum Lease</p>
                  <p className="text-sm text-gray-600">3 years with renewal option</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="font-semibold text-secondary">Annual Increment</p>
                  <p className="text-sm text-gray-600">8% per year</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Leasing Inquiry</CardTitle>
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
                  Schedule a site visit to explore available spaces
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}