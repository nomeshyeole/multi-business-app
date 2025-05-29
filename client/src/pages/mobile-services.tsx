import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Smartphone, Wrench, Shield, Truck } from "lucide-react";

export default function MobileServices() {
  const products = [
    {
      category: "Latest Smartphones",
      items: [
        { 
          name: "Samsung Galaxy S24", 
          price: "₹79,999", 
          originalPrice: "₹84,999", 
          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.8, 
          specs: ["128GB Storage", "8GB RAM", "50MP Camera", "5G Ready"],
          warranty: "1 Year",
          inStock: true 
        },
        { 
          name: "iPhone 15", 
          price: "₹79,900", 
          originalPrice: "₹84,900", 
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.9, 
          specs: ["256GB Storage", "6GB RAM", "48MP Camera", "5G Ready"],
          warranty: "1 Year",
          inStock: true 
        },
        { 
          name: "OnePlus 12", 
          price: "₹64,999", 
          originalPrice: "₹69,999", 
          image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.7, 
          specs: ["256GB Storage", "12GB RAM", "50MP Camera", "5G Ready"],
          warranty: "1 Year",
          inStock: false 
        }
      ]
    },
    {
      category: "Mobile Accessories",
      items: [
        { 
          name: "Wireless Earbuds Pro", 
          price: "₹3,999", 
          originalPrice: "₹5,999", 
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.5, 
          specs: ["Active Noise Cancellation", "30H Battery", "Water Resistant", "Fast Charging"],
          warranty: "6 Months",
          inStock: true 
        },
        { 
          name: "Fast Charger 65W", 
          price: "₹1,499", 
          originalPrice: "₹1,999", 
          image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.6, 
          specs: ["Universal Compatibility", "Super Fast Charging", "Compact Design", "Safety Features"],
          warranty: "1 Year",
          inStock: true 
        },
        { 
          name: "Premium Phone Case", 
          price: "₹899", 
          originalPrice: "₹1,299", 
          image: "https://images.unsplash.com/photo-1601593346740-925612772716?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.3, 
          specs: ["Drop Protection", "Crystal Clear", "Wireless Charging Compatible", "Easy Installation"],
          warranty: "3 Months",
          inStock: true 
        }
      ]
    }
  ];

  const services = [
    {
      name: "Screen Repair",
      price: "₹2,500 - ₹8,000",
      duration: "2-4 hours",
      description: "Professional screen replacement with original parts"
    },
    {
      name: "Battery Replacement",
      price: "₹1,500 - ₹4,000",
      duration: "1-2 hours",
      description: "Genuine battery replacement with warranty"
    },
    {
      name: "Software Issues",
      price: "₹500 - ₹1,500",
      duration: "30 mins - 2 hours",
      description: "OS updates, app fixes, and software troubleshooting"
    },
    {
      name: "Water Damage Repair",
      price: "₹3,000 - ₹12,000",
      duration: "1-3 days",
      description: "Complete water damage assessment and repair"
    }
  ];

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/services/smart-mall">
            <Button variant="ghost" className="mb-4 text-primary hover:text-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />Back to Smart Mall
            </Button>
          </Link>
          
          <div className="relative h-64 rounded-xl overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Mobile phone store" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Mobile Services Hub</h1>
                <p className="text-xl">Latest smartphones, accessories & repair services</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Products */}
            {products.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {category.items.map((item, index) => (
                      <Card key={index} className="border border-gray-200 overflow-hidden">
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-48 object-cover"
                          />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <Badge variant="destructive">Out of Stock</Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg text-secondary mb-2">{item.name}</h3>
                          <div className="flex items-center mb-2">
                            <div className="flex items-center mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({item.rating})</span>
                          </div>
                          <div className="flex items-center mb-3">
                            <span className="text-xl font-bold text-primary mr-2">{item.price}</span>
                            <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                          </div>
                          <div className="mb-3">
                            {item.specs.map((spec, specIndex) => (
                              <p key={specIndex} className="text-xs text-gray-600">• {spec}</p>
                            ))}
                            <p className="text-xs text-green-600 mt-1">Warranty: {item.warranty}</p>
                          </div>
                          <Button 
                            className="w-full bg-primary hover:bg-blue-700" 
                            disabled={!item.inStock}
                          >
                            <Smartphone className="mr-2 h-4 w-4" />
                            {item.inStock ? 'Buy Now' : 'Out of Stock'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Repair Services */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Repair Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-3">
                          <Wrench className="mr-3 h-5 w-5 text-primary" />
                          <h3 className="font-semibold text-lg text-secondary">{service.name}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-bold text-primary">{service.price}</span>
                          <span className="text-sm text-gray-500">{service.duration}</span>
                        </div>
                        <Button className="w-full bg-accent hover:bg-green-600 text-white">
                          Book Service
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Store Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Store Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Shield className="mr-3 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Authorized dealer warranty</span>
                  </div>
                  <div className="flex items-center">
                    <Wrench className="mr-3 h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-700">Expert repair services</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="mr-3 h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-700">Free home delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Store Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Store Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">First Floor, Smart Mall Complex</p>
                <p className="text-sm text-gray-600 mb-4">Open: 10:00 AM - 9:00 PM</p>
                <Button className="w-full bg-primary hover:bg-blue-700 text-white mb-2">
                  Call Store
                </Button>
                <Button variant="outline" className="w-full">
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}