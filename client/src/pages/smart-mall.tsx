import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServiceCard from "@/components/service-card";
import { ArrowLeft, ShoppingBag, Clock, MapPin, Phone, Mail, CheckCircle, Star, Wifi, Car, Shirt, Smartphone, Laptop, Home, Sparkles, Gem, Gamepad2, Baby, Dumbbell } from "lucide-react";

export default function SmartMall() {
  const services = [
    {
      title: "Clothing",
      description: "Premium fashion brands, traditional wear, casual clothing, formal attire, and designer collections.",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Fashion clothing store",
      icon: <Shirt />,
      badge: "Fashion Hub",
      slug: "clothing"
    },
    {
      title: "Footwear Store",
      description: "Branded shoes, sports footwear, formal shoes, sandals, and premium leather collections.",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Footwear store display",
      icon: <ShoppingBag />,
      badge: "Shoe Palace",
      slug: "footwear"
    },
    {
      title: "Mobile Services",
      description: "Latest smartphones, mobile accessories, repair services, and mobile network solutions.",
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Mobile phone store",
      icon: <Smartphone />,
      badge: "Tech Hub",
      slug: "mobile-services"
    },
    {
      title: "Electronics",
      description: "Latest gadgets, laptops, tablets, cameras, audio systems, and consumer electronics.",
      imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Electronics store",
      icon: <Laptop />,
      badge: "Electronics World",
      slug: "electronics"
    },
    {
      title: "Smart Home Devices",
      description: "Home automation, IoT devices, smart lighting, security systems, and connected appliances.",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Smart home devices",
      icon: <Home />,
      badge: "Smart Living",
      slug: "smart-home"
    },
    {
      title: "Cosmetic & Skincare Brands",
      description: "Premium beauty products, skincare essentials, makeup brands, and personal care items.",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Cosmetics and skincare store",
      icon: <Sparkles />,
      badge: "Beauty Zone",
      slug: "cosmetics"
    },
    {
      title: "Fashion",
      description: "Trendy outfits, designer wear, seasonal collections, and fashion accessories.",
      imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Fashion boutique",
      icon: <Sparkles />,
      badge: "Style Studio",
      slug: "fashion"
    },
    {
      title: "Jewelry",
      description: "Gold ornaments, silver jewelry, diamond collections, traditional designs, and precious stones.",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Jewelry store display",
      icon: <Gem />,
      badge: "Jewel Palace",
      slug: "jewelry"
    },
    {
      title: "Gaming Zones",
      description: "Video games, gaming consoles, VR experiences, arcade games, and competitive gaming setups.",
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Gaming zone with consoles",
      icon: <Gamepad2 />,
      badge: "Game Arena",
      slug: "gaming"
    },
    {
      title: "Kids Zones",
      description: "Children's play areas, toy stores, educational games, kids' clothing, and family entertainment.",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Kids play zone",
      icon: <Baby />,
      badge: "Kids World",
      slug: "kids-zone"
    },
    {
      title: "Fitness",
      description: "Gym equipment, fitness accessories, sportswear, nutrition supplements, and wellness products.",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Fitness equipment store",
      icon: <Dumbbell />,
      badge: "Fitness Hub",
      slug: "fitness"
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              imageAlt={service.imageAlt}
              icon={service.icon}
              badge={service.badge}
              slug={service.slug}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
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