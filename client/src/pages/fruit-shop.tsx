import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Truck, Clock, Leaf, Phone, Mail, CheckCircle, Star } from "lucide-react";

export default function FruitShop() {
  const products = [
    {
      category: "Seasonal Fruits",
      items: [
        { name: "Fresh Mangoes (Alphonso)", price: "₹450/kg", description: "Premium quality Alphonso mangoes from Maharashtra", inStock: true },
        { name: "Sweet Oranges", price: "₹80/kg", description: "Juicy Nagpur oranges rich in Vitamin C", inStock: true },
        { name: "Bananas (Robusta)", price: "₹60/dozen", description: "Fresh Kerala bananas, perfect for daily consumption", inStock: true },
        { name: "Fresh Grapes", price: "₹120/kg", description: "Seedless green grapes from Nashik vineyards", inStock: true }
      ]
    },
    {
      category: "Exotic Fruits",
      items: [
        { name: "Dragon Fruit", price: "₹250/piece", description: "Imported dragon fruit with rich antioxidants", inStock: true },
        { name: "Avocados", price: "₹180/piece", description: "Fresh Hass avocados, perfect for healthy eating", inStock: true },
        { name: "Kiwi Fruit", price: "₹300/kg", description: "New Zealand kiwi fruits packed with nutrients", inStock: false },
        { name: "Fresh Berries", price: "₹400/200g", description: "Mixed berries - strawberries, blueberries", inStock: true }
      ]
    },
    {
      category: "Dry Fruits & Nuts",
      items: [
        { name: "Premium Almonds", price: "₹800/kg", description: "California almonds, rich in protein and healthy fats", inStock: true },
        { name: "Kashmiri Walnuts", price: "₹1200/kg", description: "Fresh Kashmiri walnuts with natural oils", inStock: true },
        { name: "Dates (Medjool)", price: "₹450/kg", description: "Premium Medjool dates from Middle East", inStock: true },
        { name: "Mixed Dry Fruits", price: "₹600/kg", description: "Assorted premium dry fruits gift pack", inStock: true }
      ]
    }
  ];

  const services = [
    "Free home delivery above ₹500",
    "Fresh fruits daily sourced from farms",
    "Quality guarantee with return policy",
    "Bulk orders for events and offices",
    "Seasonal fruit subscriptions available",
    "Organic certification for select items",
    "WhatsApp ordering service",
    "Same day delivery in city limits"
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
              src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Fresh fruit shop display" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Fresh Fruit Shop</h1>
                <p className="text-xl">Farm fresh fruits delivered to your doorstep</p>
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
                            <Badge variant={item.inStock ? "default" : "destructive"} className="bg-accent text-white">
                              {item.price}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CheckCircle className={`mr-2 h-4 w-4 ${item.inStock ? 'text-green-500' : 'text-red-500'}`} />
                              <span className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                {item.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                            <Button size="sm" disabled={!item.inStock} className="bg-primary hover:bg-blue-700">
                              Order Now
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
                  <Truck className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-gray-600">Orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-sm text-gray-600">7:00 AM - 9:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Leaf className="mr-3 h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Fresh Guarantee</p>
                    <p className="text-sm text-gray-600">Direct from farms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="mr-3 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Customer Rating</p>
                    <p className="text-sm text-gray-600">4.7/5 (200+ reviews)</p>
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

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Order Now</CardTitle>
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
                  Minimum order ₹200. Same day delivery available.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}