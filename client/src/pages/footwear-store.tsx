import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ShoppingCart, Heart, Star, Check, Info, Truck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/cart-context';

// Define types for our product items
interface FootwearProduct {
  id: string | number;
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  description: string;
  image: string;
  rating: number;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  brand: string;
  features: string[];
}
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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

export default function FootwearStore() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<FootwearProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [quickViewOpen, setQuickViewOpen] = useState<boolean>(false);
  
  // Handle adding product to cart
  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize) {
      toast({
        title: "Selection required",
        description: "Please select a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    
    addToCart({
      title: `${selectedProduct.name} ${selectedColor ? `- ${selectedColor}` : ''}`,
      price: selectedProduct.price,
      imageUrl: selectedProduct.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    });
    
    toast({
      title: "Added to cart",
      description: `${selectedProduct.name} has been added to your cart.`,
    });
    
    // Reset selection after adding to cart
    setQuickViewOpen(false);
  };
  const products: FootwearProduct[] = [
    {
      id: "1",
      name: "Runner's Elite",
      category: "Running Shoes",
      price: "₹4,999",
      originalPrice: "₹6,499",
      description: "Premium running shoes with advanced cushioning technology for maximum comfort.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      rating: 4.7,
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
      colors: ["Red/Black", "Blue/White", "All Black"],
      inStock: true,
      brand: "Nike",
      features: ["Breathable mesh upper", "Responsive cushioning", "Durable rubber outsole", "Lightweight design"]
    },
    {
      id: "2",
      name: "Business Class",
      category: "Formal Shoes",
      price: "₹5,999",
      originalPrice: "₹7,499",
      description: "Elegant formal shoes perfect for business meetings and special occasions.",
      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      rating: 4.8,
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
      colors: ["Black", "Brown", "Tan"],
      inStock: true,
      brand: "Allen Solly",
      features: ["Genuine leather", "Memory foam insole", "Slip-resistant", "Hand-crafted"]
    },
    {
      id: "3",
      name: "Urban Walker",
      category: "Casual Shoes",
      price: "₹2,999",
      originalPrice: "₹3,999",
      description: "Stylish and comfortable casual shoes for everyday wear.",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80",
      rating: 4.5,
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
      colors: ["White", "Black", "Grey"],
      inStock: true,
      brand: "Puma",
      features: ["Canvas upper", "Cushioned insole", "Flexible outsole", "Easy to clean"]
    },
    {
      id: "4",
      name: "Trail Blazer",
      category: "Hiking Boots",
      price: "₹6,499",
      originalPrice: "₹7,999",
      description: "Durable hiking boots designed for challenging terrains and outdoor adventures.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      rating: 4.9,
      sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
      colors: ["Brown/Green", "Black/Grey", "Brown/Tan"],
      inStock: true,
      brand: "Woodland",
      features: ["Waterproof", "High-traction grip", "Ankle support", "Durable construction"]
    },
    {
      id: "5",
      name: "Street Flow",
      category: "Sneakers",
      price: "₹3,499",
      originalPrice: "₹4,999",
      description: "Trendy sneakers that combine style with comfort for the fashion-conscious.",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      rating: 4.6,
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
      colors: ["White/Red", "Black/White", "All White"],
      inStock: true,
      brand: "Adidas",
      features: ["Stylish design", "Cushioned footbed", "Durable construction", "Breathable material"]
    },
    {
      id: "6",
      name: "Fitness Pro",
      category: "Sports Shoes",
      price: "₹4,499",
      originalPrice: "₹5,499",
      description: "Professional training shoes designed for gym workouts and fitness activities.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      rating: 4.7,
      sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
      colors: ["Black/Blue", "Grey/Orange", "White/Green"],
      inStock: false,
      brand: "Reebok",
      features: ["Anti-slip sole", "Enhanced support", "Shock absorption", "Lightweight"]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <Link href="/services/smart-mall">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Mall Directory
              </Button>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button className="flex items-center gap-2 relative">
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                  <CartBadge />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-lg">
                <ShoppingCartPanel />
              </SheetContent>
            </Sheet>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">
            Footwear Store
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Step into comfort and style with our premium collection of footwear for all occasions. 
            From athletic performance to elegant formal wear, we've got the perfect pair for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden bg-white shadow-lg rounded-2xl border border-blue-100">
              <div className="h-64 overflow-hidden relative group">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full h-8 w-8 shadow-md"
                    onClick={() => {
                      setSelectedProduct(product);
                      setQuickViewOpen(true);
                    }}
                  >
                    <Info size={16} />
                  </Button>
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-1.5 rounded-md font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-secondary">{product.name}</h3>
                  <div className="text-right">
                    <div className="text-primary font-semibold">{product.price}</div>
                    {product.originalPrice && (
                      <div className="text-gray-400 text-sm line-through">{product.originalPrice}</div>
                    )}
                  </div>
                </div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                  {product.category}
                </span>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-2">Available sizes:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.slice(0, 4).map((size) => (
                      <Badge 
                        key={size} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      >
                        {size}
                      </Badge>
                    ))}
                    {product.sizes.length > 4 && <Badge variant="outline">+{product.sizes.length - 4}</Badge>}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSelectedProduct(product);
                      setQuickViewOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2"
                    disabled={!product.inStock}
                    onClick={() => {
                      if (product.inStock) {
                        // Add first item with default size
                        addToCart({
                          title: product.name,
                          price: product.price,
                          imageUrl: product.image,
                          size: product.sizes[0],
                          quantity: 1
                        });
                        
                        toast({
                          title: "Added to cart",
                          description: `${product.name} (${product.sizes[0]}) has been added to your cart.`,
                        });
                      }
                    }}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Product Quick View Dialog */}
      <Dialog open={quickViewOpen && selectedProduct !== null} onOpenChange={(open) => {
        setQuickViewOpen(open);
        if (!open) setSelectedProduct(null);
      }}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProduct.name}</DialogTitle>
                <DialogDescription className="text-gray-500 flex items-center gap-1.5">
                  By <span className="font-medium text-gray-700">{selectedProduct.brand}</span>
                  {" • "}
                  <span className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(selectedProduct.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-1">{selectedProduct.rating}</span>
                  </span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
                <div className="rounded-lg overflow-hidden h-[300px]">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-xl">{selectedProduct.price}</div>
                      {selectedProduct.originalPrice && (
                        <div className="text-gray-400 line-through text-sm">{selectedProduct.originalPrice}</div>
                      )}
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {selectedProduct.inStock ? (
                        <><Check size={14} className="mr-1" /> In Stock</>
                      ) : (
                        "Out of Stock"
                      )}
                    </Badge>
                    <Separator className="my-3" />
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Size Selection */}
                    <div>
                      <Label htmlFor="size" className="block text-sm font-medium mb-2">Size</Label>
                      <RadioGroup 
                        id="size" 
                        value={selectedSize} 
                        onValueChange={setSelectedSize}
                        className="flex flex-wrap gap-2"
                      >
                        {selectedProduct.sizes.map((size) => (
                          <div key={size} className="flex items-center">
                            <RadioGroupItem 
                              value={size} 
                              id={`size-${size}`} 
                              className="hidden peer"
                            />
                            <Label 
                              htmlFor={`size-${size}`}
                              className="px-3 py-1.5 border rounded-md text-sm cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:bg-gray-100"
                            >
                              {size}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    {/* Color Selection */}
                    {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                      <div>
                        <Label htmlFor="color" className="block text-sm font-medium mb-2">Color</Label>
                        <RadioGroup 
                          id="color" 
                          value={selectedColor} 
                          onValueChange={setSelectedColor}
                          className="flex flex-wrap gap-2"
                        >
                          {selectedProduct.colors.map((color) => (
                            <div key={color} className="flex items-center">
                              <RadioGroupItem 
                                value={color} 
                                id={`color-${color}`} 
                                className="hidden peer"
                              />
                              <Label 
                                htmlFor={`color-${color}`}
                                className="px-3 py-1.5 border rounded-md text-sm cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:bg-gray-100"
                              >
                                {color}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                    
                    {/* Quantity Selection */}
                    <div>
                      <Label htmlFor="quantity" className="block text-sm font-medium mb-2">Quantity</Label>
                      <div className="flex items-center">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          -
                        </Button>
                        <div className="w-12 text-center">{quantity}</div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Truck size={16} className="mr-2" />
                      Free delivery on orders above ₹999
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        className="w-full" 
                        disabled={!selectedProduct.inStock}
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                      <Button variant="outline" className="w-full">
                        Save for Later
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="mt-2">
                <h4 className="font-medium mb-2">Features:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check size={16} className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
