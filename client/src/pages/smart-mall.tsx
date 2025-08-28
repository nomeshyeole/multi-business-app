import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MallServiceCard from "@/components/mall-service-card";
import { ArrowLeft, ShoppingBag, ShoppingCart, Clock, MapPin, Phone, Mail, CheckCircle, Star, Wifi, Car, Shirt, Smartphone, Laptop, Home, Sparkles, Gem, Gamepad2, Baby, Dumbbell, X, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Cart Badge Component to show item count
function CartBadge() {
  const { itemCount } = useCart();
  
  if (itemCount === 0) return null;
  
  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {itemCount > 99 ? '99+' : itemCount}
    </span>
  );
}

// Shopping Cart Panel Component
function ShoppingCartPanel() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Calculate total price (converting string prices to numbers for calculation)
  const totalPrice = items.reduce((total, item) => {
    const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return total + (priceValue * item.quantity);
  }, 0);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="mb-4">
        <SheetTitle className="text-2xl flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Shopping Cart
        </SheetTitle>
      </SheetHeader>
      
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-2" />
          <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
          <p className="text-gray-500 mb-4">Browse the mall to add items to your cart</p>
          <SheetClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </SheetClose>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 border-b border-gray-200 pb-3">
                  <div className="h-16 w-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.price}</p>
                    <div className="flex items-center mt-1">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-6 w-6 rounded-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-6 w-6 rounded-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full" 
              disabled={isCheckingOut}
              onClick={handleCheckout}
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={clearCart}
              disabled={isCheckingOut}
            >
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function SmartMall() {
  type ServiceAction = "book" | "buy" | "visit";
  
  interface MallService {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    icon: React.ReactNode;
    badge: string;
    slug: string;
    price: string;
    actionType: ServiceAction;
  }
  
  const services: MallService[] = [
    {
      title: "Clothing",
      description: "Premium fashion brands, traditional wear, casual clothing, formal attire, and designer collections.",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Fashion clothing store",
      icon: <Shirt />,
      badge: "Fashion Hub",
      slug: "clothing",
      price: "₹999 onwards",
      actionType: "visit"
    },
    {
      title: "Footwear Store",
      description: "Branded shoes, sports footwear, formal shoes, sandals, and premium leather collections.",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Footwear store display",
      icon: <ShoppingBag />,
      badge: "Shoe Palace",
      slug: "footwear",
      price: "₹1,499 onwards",
      actionType: "buy"
    },
    {
      title: "Mobile Services",
      description: "Latest smartphones, mobile accessories, repair services, and mobile network solutions.",
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Mobile phone store",
      icon: <Smartphone />,
      badge: "Tech Hub",
      slug: "mobile-services",
      price: "₹499 onwards",
      actionType: "book"
    },
    {
      title: "Electronics",
      description: "Latest gadgets, laptops, tablets, cameras, audio systems, and consumer electronics.",
      imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Electronics store",
      icon: <Laptop />,
      badge: "Electronics World",
      slug: "electronics",
      price: "₹2,999 onwards",
      actionType: "buy"
    },
    {
      title: "Smart Home Devices",
      description: "Home automation, IoT devices, smart lighting, security systems, and connected appliances.",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Smart home devices",
      icon: <Home />,
      badge: "Smart Living",
      slug: "smart-home",
      price: "₹1,299 onwards",
      actionType: "buy"
    },
    {
      title: "Cosmetic & Skincare Brands",
      description: "Premium beauty products, skincare essentials, makeup brands, and personal care items.",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Cosmetics and skincare store",
      icon: <Sparkles />,
      badge: "Beauty Zone",
      slug: "cosmetics",
      price: "₹799 onwards",
      actionType: "buy"
    },
    {
      title: "Fashion",
      description: "Trendy outfits, designer wear, seasonal collections, and fashion accessories.",
      imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Fashion boutique",
      icon: <Sparkles />,
      badge: "Style Studio",
      slug: "fashion",
      price: "₹1,199 onwards",
      actionType: "buy"
    },
    {
      title: "Jewelry",
      description: "Gold ornaments, silver jewelry, diamond collections, traditional designs, and precious stones.",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Jewelry store display",
      icon: <Gem />,
      badge: "Jewel Palace",
      slug: "jewelry",
      price: "₹5,999 onwards",
      actionType: "visit"
    },
    {
      title: "Gaming Zones",
      description: "Video games, gaming consoles, VR experiences, arcade games, and competitive gaming setups.",
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Gaming zone with consoles",
      icon: <Gamepad2 />,
      badge: "Game Arena",
      slug: "gaming",
      price: "₹299/hour",
      actionType: "book"
    },
    {
      title: "Kids Zones",
      description: "Children's play areas, toy stores, educational games, kids' clothing, and family entertainment.",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Kids play zone",
      icon: <Baby />,
      badge: "Kids World",
      slug: "kids-zone",
      price: "₹399/hour",
      actionType: "book"
    },
    {
      title: "Fitness",
      description: "Gym equipment, fitness accessories, sportswear, nutrition supplements, and wellness products.",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Fitness equipment store",
      icon: <Dumbbell />,
      badge: "Fitness Hub",
      slug: "fitness",
      price: "₹1,999 onwards",
      actionType: "buy"
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
          <div className="flex justify-between items-center mb-4">
            <Link href="/services">
              <Button variant="ghost" className="text-primary hover:text-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />Back to Services
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Cart
                    <CartBadge />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:max-w-lg">
                  <ShoppingCartPanel />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="relative h-80 rounded-xl overflow-hidden mb-6">
            <img 
              src="https://i.imgur.com/GEerEAQ.jpg" 
              alt="Smart Mall & Shopping Complex" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-8">
              <div className="text-center text-white pb-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Smart Mall & Shopping Complex</h1>
                <p className="text-xl">A cutting-edge shopping destination with digital directories and specialty stores</p>
                <div className="inline-flex flex-wrap gap-2 justify-center mt-4">
                  <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200">Premium Brands</Badge>
                  <Badge className="px-3 py-1 text-sm bg-green-100 text-green-800 hover:bg-green-200">Modern Shopping</Badge>
                  <Badge className="px-3 py-1 text-sm bg-purple-100 text-purple-800 hover:bg-purple-200">Smart Technology</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title for the shops */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-secondary mb-4 tracking-tight">
            Explore Our Stores
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Welcome to our modern shopping destination featuring a variety of specialty stores. 
            Explore our mall directory below to discover quality products and services.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <MallServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              imageAlt={service.imageAlt}
              icon={service.icon}
              badge={service.badge}
              slug={service.slug}
              price={service.price}
              actionType={service.actionType}
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