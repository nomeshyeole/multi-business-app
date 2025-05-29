import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Leaf, Phone, Mail, CheckCircle, Star, ShoppingCart } from "lucide-react";

export default function KiranPanCenter() {
  const products = [
    {
      category: "Pan & Tobacco Products",
      items: [
        { name: "Sweet Paan", price: "₹20", description: "Traditional sweet betel leaves with gulkand and fennel", available: true },
        { name: "Saada Paan", price: "₹15", description: "Plain betel leaves with basic ingredients", available: true },
        { name: "Special Calcutta Paan", price: "₹35", description: "Premium paan with coconut, dates and special masala", available: true },
        { name: "Zarda Paan", price: "₹25", description: "Traditional tobacco paan for regular customers", available: true }
      ]
    },
    {
      category: "Cigarettes & Tobacco",
      items: [
        { name: "Premium Cigarettes", price: "₹10-15/stick", description: "Various brands available", available: true },
        { name: "Bidi Pack", price: "₹5", description: "Traditional Indian cigarettes", available: true },
        { name: "Gutka Packets", price: "₹10-20", description: "Flavored tobacco products", available: true },
        { name: "Khaini", price: "₹15", description: "Loose tobacco for regular users", available: true }
      ]
    },
    {
      category: "Snacks & Refreshments",
      items: [
        { name: "Samosa", price: "₹12", description: "Fresh hot samosas made daily", available: true },
        { name: "Tea/Chai", price: "₹8", description: "Fresh masala tea served hot", available: true },
        { name: "Biscuit Packets", price: "₹20-50", description: "Various brands and flavors", available: true },
        { name: "Cold Drinks", price: "₹25-40", description: "Soft drinks and energy drinks", available: true }
      ]
    },
    {
      category: "Daily Essentials",
      items: [
        { name: "Mobile Recharge", price: "As per plan", description: "All network recharge available", available: true },
        { name: "Newspapers", price: "₹3-5", description: "Local and national dailies", available: true },
        { name: "Matches & Lighters", price: "₹2-15", description: "Safety matches and gas lighters", available: true },
        { name: "Phone Cards", price: "₹10-100", description: "Prepaid calling cards", available: true }
      ]
    }
  ];

  const services = [
    "Fresh paan made to order",
    "Mobile recharge for all networks",
    "Home delivery above ₹100",
    "Daily newspaper service",
    "Loyal customer discounts",
    "Fresh ingredients daily",
    "Hygienic preparation",
    "Quick service"
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
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Traditional pan shop" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Kiran Pan Center</h1>
                <p className="text-xl">Traditional pan & daily essentials</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Products */}
            {products.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.items.map((item, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-lg text-secondary">{item.name}</h3>
                            <Badge variant="secondary" className="bg-accent text-white">{item.price}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CheckCircle className={`mr-2 h-4 w-4 ${item.available ? 'text-green-500' : 'text-red-500'}`} />
                              <span className={`text-sm ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                                {item.available ? 'Available' : 'Out of Stock'}
                              </span>
                            </div>
                            <Button size="sm" disabled={!item.available} className="bg-primary hover:bg-blue-700">
                              <ShoppingCart className="mr-1 h-3 w-3" />
                              Order
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Shop Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-sm text-gray-600">6:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Leaf className="mr-3 h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Fresh Preparation</p>
                    <p className="text-sm text-gray-600">Made fresh daily</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="mr-3 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Customer Rating</p>
                    <p className="text-sm text-gray-600">4.6/5 (150+ reviews)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Our Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="mr-3 h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Special Offers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-secondary">Regular Customer</p>
                  <p className="text-sm text-gray-600">Buy 10 paan, get 1 free</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-secondary">Daily Combo</p>
                  <p className="text-sm text-gray-600">Paan + Tea for ₹25</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="font-semibold text-secondary">Home Delivery</p>
                  <p className="text-sm text-gray-600">Free delivery above ₹100</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-primary hover:bg-blue-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Call: +91-9876543210
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  WhatsApp Order
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Visit us for authentic taste and quality products
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}