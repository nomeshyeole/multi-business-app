import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { businessApi, reviewApi, type Business } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function WriteReviewPage() {
  const [_, params] = useRoute('/businesses/:id/review');
  const businessId = params ? parseInt(params.id) : null;
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [business, setBusiness] = useState<Business | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  // Load business details
  useEffect(() => {
    const loadBusiness = async () => {
      if (!businessId) return;
      
      setIsLoading(true);
      try {
        const data = await businessApi.getById(businessId);
        setBusiness(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error loading business',
          description: error instanceof Error ? error.message : 'Failed to load business details',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBusiness();
  }, [businessId, toast]);
  
  // Handle review submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !businessId) return;
    
    setIsSubmitting(true);
    try {
      await reviewApi.create({
        business_id: businessId,
        user_id: user.id,
        rating,
        comment: comment.trim() || null
      });
      
      toast({
        title: 'Review submitted',
        description: 'Thank you for your review!',
      });
      
      // Navigate back to business details
      navigate(`/businesses/${businessId}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error submitting review',
        description: error instanceof Error ? error.message : 'Failed to submit review',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded-md w-full"></div>
        </div>
      </div>
    );
  }
  
  if (!business) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTitle>Business not found</AlertTitle>
          <AlertDescription>
            The business you're trying to review doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
        <Button className="mt-6" onClick={() => navigate('/businesses')}>
          Back to Businesses
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <Button variant="outline" className="mb-6" onClick={() => navigate(`/businesses/${businessId}`)}>
          ← Back to {business.name}
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>Share your experience at {business.name}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Rating selection */}
              <div>
                <label className="block font-medium mb-2">Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-3xl focus:outline-none"
                    >
                      <span className={star <= rating ? "text-yellow-500" : "text-gray-300"}>
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="ml-4 text-sm text-gray-500">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Average"}
                    {rating === 4 && "Good"}
                    {rating === 5 && "Excellent"}
                  </span>
                </div>
              </div>
              
              {/* Review text */}
              <div>
                <label htmlFor="comment" className="block font-medium mb-2">
                  Your Review (optional)
                </label>
                <Textarea
                  id="comment"
                  placeholder="Share your experience with this business..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  className="w-full"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="ml-auto">
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
