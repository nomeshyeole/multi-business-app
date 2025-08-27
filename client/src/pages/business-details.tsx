import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { businessApi, serviceApi, reviewApi, type Business, type Service, type Review } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';

export default function BusinessDetailsPage() {
  const [_, params] = useRoute('/businesses/:id');
  const businessId = params ? parseInt(params.id) : null;
  
  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Load business details, services and reviews
  useEffect(() => {
    const loadData = async () => {
      if (!businessId) return;
      
      setIsLoading(true);
      try {
        // Fetch business details
        const businessData = await businessApi.getById(businessId);
        setBusiness(businessData);
        
        // Fetch services
        const servicesData = await serviceApi.getByBusinessId(businessId);
        setServices(servicesData);
        
        // Fetch reviews
        const reviewsData = await reviewApi.getByBusinessId(businessId);
        setReviews(reviewsData);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error loading business details',
          description: error instanceof Error ? error.message : 'Failed to load business details',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [businessId, toast]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-md w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded-md w-full mb-8"></div>
          <div className="h-8 bg-gray-200 rounded-md w-1/5 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-md w-full mb-8"></div>
          <div className="h-8 bg-gray-200 rounded-md w-1/5 mb-4"></div>
          <div className="h-48 bg-gray-200 rounded-md w-full"></div>
        </div>
      </div>
    );
  }
  
  if (!business) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Business not found</h1>
        <p className="mb-6">The business you're looking for doesn't exist or has been removed.</p>
        <Link href="/businesses">
          <Button>Back to Businesses</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/businesses">
          <Button variant="outline" size="sm">
            ← Back to Businesses
          </Button>
        </Link>
      </div>
      
      {/* Business Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
        <div className="flex items-center mb-4">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            {business.type.charAt(0).toUpperCase() + business.type.slice(1)}
          </span>
          <div className="ml-4 flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{business.rating || 'No ratings'}</span>
            <span className="ml-2 text-xs text-gray-500">
              ({business.review_count || 0} {business.review_count === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
        
        {/* Business Image */}
        {business.image_url ? (
          <img
            src={business.image_url}
            alt={business.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        
        {/* Business Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">About this Business</h2>
          <p className="mb-6">{business.description || 'No description available.'}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {business.address && (
              <div>
                <h3 className="font-medium text-gray-700">Address</h3>
                <p>{business.address}</p>
              </div>
            )}
            
            {business.contact_phone && (
              <div>
                <h3 className="font-medium text-gray-700">Phone</h3>
                <p>{business.contact_phone}</p>
              </div>
            )}
            
            {business.contact_email && (
              <div>
                <h3 className="font-medium text-gray-700">Email</h3>
                <p>{business.contact_email}</p>
              </div>
            )}
            
            {business.operating_hours && (
              <div>
                <h3 className="font-medium text-gray-700">Hours</h3>
                <p>{business.operating_hours}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Services</h2>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  {service.price && <CardDescription>Price: {service.price}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <p>{service.description || 'No description available.'}</p>
                  {service.duration && (
                    <p className="mt-2 text-sm text-gray-500">Duration: {service.duration}</p>
                  )}
                  {service.capacity && (
                    <p className="text-sm text-gray-500">Capacity: {service.capacity}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No services listed for this business.</p>
        )}
      </div>
      
      {/* Reviews Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          {user && (
            <Link href={`/businesses/${business.id}/review`}>
              <Button>Write a Review</Button>
            </Link>
          )}
        </div>
        
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                      {review.user_id.toString().charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">User #{review.user_id}</p>
                  </div>
                </div>
                
                {review.comment && <p>{review.comment}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
            <p className="text-gray-500 mb-4">Be the first to review this business!</p>
            {user ? (
              <Link href={`/businesses/${business.id}/review`}>
                <Button>Write a Review</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline">Log in to Write a Review</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
