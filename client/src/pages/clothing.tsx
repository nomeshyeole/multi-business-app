import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Heart, ShoppingCart, Truck, RefreshCw, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/cart-context";

// Define types for our product items
interface ProductItem {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  rating: number;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

// Define type for product category
interface ProductCategory {
  category: string;
  items: ProductItem[];
}
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
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
          <ShoppingCart className="h-16 w-16 text-gray-300 mb-2" />
          <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
          <p className="text-gray-500 mb-4">Start adding items to your cart</p>
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

export default function Clothing() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<ProductItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  
  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    addToCart({
      title: selectedItem.name,
      price: selectedItem.price,
      quantity: quantity,
      imageUrl: selectedItem.image,
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${selectedItem.name} added to your cart`,
    });
    
    setCartDialogOpen(false);
    setQuantity(1);
  };
  const products: ProductCategory[] = [
    {
      category: "Men's Clothing",
      items: [
        { 
          id: "m1",
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
          id: "m2",
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
          id: "m3",
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
          id: "w1",
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
          id: "w2",
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
          id: "w3",
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
          id: "k1",
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
          id: "k2",
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
          <div className="flex justify-between items-center mb-4">
            <Link href="/services/smart-mall">
              <Button variant="ghost" className="text-primary hover:text-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />Back to Smart Mall
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
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.inStock) {
                                setSelectedItem(item);
                                setCartDialogOpen(true);
                              }
                            }}
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
      
      {/* Add to Cart Dialog */}
      <Dialog open={cartDialogOpen && selectedItem !== null} onOpenChange={setCartDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
            {selectedItem && (
              <DialogDescription>
                {selectedItem.name} - {selectedItem.price}
              </DialogDescription>
            )}
          </DialogHeader>
          
          <div className="flex items-center space-x-4 py-4">
            <div className="h-24 w-24 rounded bg-gray-100 overflow-hidden flex-shrink-0">
              {selectedItem && (
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem?.name} 
                  className="h-full w-full object-cover" 
                />
              )}
            </div>
            
            <div>
              {selectedItem && (
                <>
                  <p className="font-medium">{selectedItem.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available sizes: {selectedItem.sizes.join(', ')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available colors: {selectedItem.colors.join(', ')}
                  </p>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 py-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              -
            </Button>
            <span className="font-medium text-xl w-8 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </Button>
          </div>
          
          <DialogFooter className="flex flex-row justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setCartDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}