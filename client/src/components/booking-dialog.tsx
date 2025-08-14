import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type BookingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  duration: string;
  price: string;
};

// Available time slots
const timeSlots = [
  "06:00 AM", "07:30 AM", "09:00 AM", "10:30 AM", "12:00 PM",
  "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM", "07:30 PM", "09:00 PM"
];

export function BookingDialog({ open, onOpenChange, serviceName, duration, price }: BookingDialogProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Step management
  const [step, setStep] = useState<'date' | 'time' | 'payment' | 'confirm'>('date');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online' | undefined>(undefined);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleContinue = () => {
    if (step === 'date') {
      if (!date) {
        toast({
          title: "Select a date",
          description: "Please select a date for your booking",
          variant: "destructive"
        });
        return;
      }
      setStep('time');
    } else if (step === 'time') {
      if (!timeSlot) {
        toast({
          title: "Select a time slot",
          description: "Please select a time slot for your booking",
          variant: "destructive"
        });
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      if (!paymentMethod) {
        toast({
          title: "Select payment method",
          description: "Please select a payment method to proceed",
          variant: "destructive"
        });
        return;
      }
      
      if (paymentMethod === 'cash') {
        setStep('confirm');
      } else if (paymentMethod === 'online' && !paymentConfirmed) {
        toast({
          title: "Payment confirmation required",
          description: "Please confirm that you've completed the payment",
          variant: "destructive"
        });
        return;
      } else {
        setStep('confirm');
      }
    }
  };

  const handleBack = () => {
    if (step === 'time') setStep('date');
    if (step === 'payment') setStep('time');
    if (step === 'confirm') setStep('payment');
  };

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to book this facility",
        variant: "destructive"
      });
      return;
    }

    if (!date || !timeSlot) {
      toast({
        title: "Incomplete booking",
        description: "Please select both date and time for your booking",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would call an API here
      // For demonstration purposes, we'll simulate a successful booking
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Booking confirmed!",
        description: `Your ${serviceName} has been booked for ${format(date, 'PPP')} at ${timeSlot}. Payment method: ${paymentMethod === 'cash' ? 'Cash (Pay at venue)' : 'Online (UPI)'}`,
      });
      
      // Reset and close dialog
      setDate(undefined);
      setTimeSlot(undefined);
      setPaymentMethod(undefined);
      setPaymentConfirmed(false);
      setStep('date');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "There was a problem with your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only allow bookings for future dates (today and onwards)
  const disabledDates = {
    before: new Date(),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{serviceName}</DialogTitle>
          <DialogDescription>
            Book your {serviceName.toLowerCase()} session. Duration: {duration} | Price: {price}
          </DialogDescription>
        </DialogHeader>

        {step === 'date' && (
          <div className="py-4 space-y-4">
            <h3 className="font-medium text-lg">Select Date</h3>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={disabledDates}
                className="rounded-md border shadow"
              />
            </div>
          </div>
        )}

        {step === 'time' && (
          <div className="py-4 space-y-4">
            <h3 className="font-medium text-lg">Select Time Slot</h3>
            <p className="text-sm text-gray-500">
              Selected date: {date ? format(date, 'PPP') : 'No date selected'}
            </p>

            <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <div key={slot} className="flex items-center space-x-2">
                  <RadioGroupItem value={slot} id={`time-${slot}`} />
                  <Label htmlFor={`time-${slot}`} className="text-sm">
                    {slot}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        
        {step === 'payment' && (
          <div className="py-4 space-y-4">
            <h3 className="font-medium text-lg">Payment Method</h3>
            <p className="text-sm text-gray-500">
              Select how you would like to pay for your booking.
            </p>
            
            <RadioGroup value={paymentMethod} onValueChange={(value) => {
              setPaymentMethod(value as 'cash' | 'online');
              setPaymentConfirmed(false); // Reset payment confirmation when changing method
            }} className="space-y-3">
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                <RadioGroupItem value="cash" id="payment-cash" />
                <Label htmlFor="payment-cash" className="font-medium">Pay with Cash</Label>
                <p className="text-sm text-gray-500 ml-6">Pay in person at the venue</p>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                <RadioGroupItem value="online" id="payment-online" />
                <Label htmlFor="payment-online" className="font-medium">UPI Payment</Label>
                <p className="text-sm text-gray-500 ml-6">Pay now using UPI</p>
              </div>
            </RadioGroup>
            
            {paymentMethod === 'online' && (
              <div className="mt-4 border rounded-md p-4 bg-gray-50 space-y-3">
                <h4 className="font-medium">Scan QR Code to Pay</h4>
                <p className="text-sm text-gray-600">UPI ID: <span className="font-medium">8459195930@axl</span></p>
                <div className="flex justify-center my-4">
                  <img 
                    src="/upi-qr-code.png"
                    alt="UPI QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="payment-confirmed" 
                    checked={paymentConfirmed}
                    onChange={(e) => setPaymentConfirmed(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="payment-confirmed" className="text-sm font-medium">
                    I confirm that I have completed the payment
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'confirm' && (
          <div className="py-4 space-y-4">
            <h3 className="font-medium text-lg">Confirm Booking</h3>
            
            <div className="space-y-2 border rounded-md p-4 bg-gray-50">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{date ? format(date, 'PPP') : 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{timeSlot || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">{price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">
                  {paymentMethod === 'cash' ? 'Cash (Pay at venue)' : 'Online Payment (UPI)'}
                </span>
              </div>
              {paymentMethod === 'online' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className="font-medium text-green-600">Paid</span>
                </div>
              )}
            </div>

            {!user && (
              <div className="text-amber-600 bg-amber-50 p-3 rounded-md text-sm border border-amber-200">
                You need to be logged in to complete this booking.
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex sm:justify-between">
          {step !== 'date' ? (
            <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
              Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain layout with flex-justify-between
          )}

          {step !== 'confirm' ? (
            <Button onClick={handleContinue}>
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleBooking} 
              disabled={isSubmitting || !user}
              className="bg-primary"
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
