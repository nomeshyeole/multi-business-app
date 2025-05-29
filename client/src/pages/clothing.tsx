import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Heart, ShoppingCart, Truck, RefreshCw } from "lucide-react";

export default function Clothing() {
  const products = [
    {
      category: "Men's Clothing",
      items: [
        { 
          name: "Cotton Casual Shirt", 
          price: "₹1,299", 
          originalPrice: "₹1,799", 
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.5, 
          sizes: ["S", "M", "L", "XL"], 
          colors: ["Blue", "White", "Black"],
          inStock: true 
        },
        { 
          name: "Formal Blazer", 
          price: "₹3,499", 
          originalPrice: "₹4,999", 
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.7, 
          sizes: ["M", "L", "XL", "XXL"], 
          colors: ["Navy", "Charcoal", "Brown"],
          inStock: true 
        },
        { 
          name: "Denim Jeans", 
          price: "₹2,199", 
          originalPrice: "₹2,999", 
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.3, 
          sizes: ["30", "32", "34", "36"], 
          colors: ["Blue", "Black", "Grey"],
          inStock: true 
        }
      ]
    },
    {
      category: "Women's Clothing",
      items: [
        { 
          name: "Floral Summer Dress", 
          price: "₹1,899", 
          originalPrice: "₹2,499", 
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.6, 
          sizes: ["XS", "S", "M", "L"], 
          colors: ["Pink", "Blue", "Yellow"],
          inStock: true 
        },
        { 
          name: "Office Blouse", 
          price: "₹1,599", 
          originalPrice: "₹2,199", 
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.4, 
          sizes: ["S", "M", "L", "XL"], 
          colors: ["White", "Cream", "Light Blue"],
          inStock: false 
        },
        { 
          name: "Designer Saree", 
          price: "₹4,999", 
          originalPrice: "₹7,499", 
          image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.8, 
          sizes: ["Free Size"], 
          colors: ["Red", "Green", "Purple"],
          inStock: true 
        }
      ]
    },
    {
      category: "Kids Clothing",
      items: [
        { 
          name: "Kids T-Shirt Set", 
          price: "₹899", 
          originalPrice: "₹1,299", 
          image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.5, 
          sizes: ["2-3Y", "4-5Y", "6-7Y"], 
          colors: ["Multi", "Blue", "Red"],
          inStock: true 
        },
        { 
          name: "School Uniform", 
          price: "₹1,299", 
          originalPrice: "₹1,799", 
          image: "https://images.unsplash.com/photo-1503944168292-293aaac13be8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
          rating: 4.2, 
          sizes: ["6Y", "8Y", "10Y", "12Y"], 
          colors: ["Navy", "White"],
          inStock: true 
        }
      ]
    }
  ];

  const features = [
    "Free alterations service",
    "30-day return policy",
    "Premium fabric quality",
    "Expert styling consultation",
    "Home delivery available",
    "Easy exchange policy"
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
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Fashion clothing store" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Fashion Hub - Clothing Store</h1>
                <p className="text-xl">Premium fashion for every occasion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Products by Category */}
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
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
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
                            <p className="text-xs text-gray-600 mb-1">Sizes: {item.sizes.join(", ")}</p>
                            <p className="text-xs text-gray-600">Colors: {item.colors.join(", ")}</p>
                          </div>
                          <Button 
                            className="w-full bg-primary hover:bg-blue-700" 
                            disabled={!item.inStock}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
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
            {/* Store Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Store Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Delivery & Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Truck className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-gray-600">Orders above ₹2,000</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="mr-3 h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Store Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Store Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Ground Floor, Smart Mall Complex</p>
                <Button className="w-full bg-primary hover:bg-blue-700 text-white">
                  Visit Store
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}