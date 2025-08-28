import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, Calendar, Eye } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "./booking-dialog";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/cart-context";
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

interface MallServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  icon: React.ReactNode;
  badge: string;
  slug: string;
  price?: string;
  actionType: "book" | "buy" | "visit"; // Different action types based on the service
}

// Function to check date availability - in a real app this would query a backend
const checkDateAvailability = async (date: Date) => {
  // Simulate API call with 500ms delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, we'll assume most dates have availability
  // In a real application, this would check against bookings database
  return ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM"];
};

export default function MallServiceCard({ 
  title, 
  description, 
  imageUrl, 
  imageAlt, 
  icon, 
  badge, 
  slug,
  price = "Varies",
  actionType
}: MallServiceCardProps) {
  const { toast } = useToast();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // Special case for footwear store
  const linkUrl = slug === "footwear" ? "/footwear-store" : `/smart-mall/${slug}`;
  
  const { addToCart } = useCart();

  // Handle adding item to cart
  const handleAddToCart = () => {
    addToCart({
      title,
      price,
      quantity,
      imageUrl,
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${title} added to your cart`,
    });
    setCartDialogOpen(false);
  };

  // Render different actions based on the type of service
  const renderActions = () => {
    switch (actionType) {
      case "book":
        return (
          <Button 
            variant="default" 
            className="w-full mt-2"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              setBookingOpen(true);
            }}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        );
      
      case "buy":
        return (
          <Button 
            variant="default" 
            className="w-full mt-2"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              setCartDialogOpen(true);
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        );
      
      case "visit":
        return (
          <Button 
            variant="outline" 
            className="w-full mt-2"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        );
    }
  };
  
  return (
    <>
      <Link href={linkUrl}>
        <Card className="service-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              <div className="text-primary text-2xl mr-3">
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-secondary">{title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-accent font-semibold">{badge}</span>
              {price && <span className="font-medium text-green-700">{price}</span>}
            </div>
            
            {renderActions()}
          </CardContent>
        </Card>
      </Link>

      {/* Booking Dialog */}
      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        serviceName={title}
        duration="60 minutes"
        price={price}
      />

      {/* Add to Cart Dialog */}
      <Dialog open={cartDialogOpen} onOpenChange={setCartDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
            <DialogDescription>
              {title} - {price}
            </DialogDescription>
          </DialogHeader>
          
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
    </>
  );
}
