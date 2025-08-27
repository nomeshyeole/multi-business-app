import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { businessApi, type Business } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const { toast } = useToast();
  
  // Get unique business types from the list
  const businessTypes = [...new Set(businesses.map(business => business.type))];

  // Load businesses on mount
  useEffect(() => {
    const loadBusinesses = async () => {
      setIsLoading(true);
      try {
        const data = await businessApi.getAll();
        setBusinesses(data);
        setFilteredBusinesses(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error loading businesses',
          description: error instanceof Error ? error.message : 'Failed to load businesses',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBusinesses();
  }, [toast]);

  // Filter businesses when search term or type changes
  useEffect(() => {
    let filtered = businesses;
    
    // Filter by type if selected
    if (selectedType) {
      filtered = filtered.filter(business => business.type === selectedType);
    }
    
    // Filter by search term if present
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(term) || 
        (business.description && business.description.toLowerCase().includes(term))
      );
    }
    
    setFilteredBusinesses(filtered);
  }, [businesses, searchTerm, selectedType]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Business Directory</h1>
          <p className="text-muted-foreground">Find and explore businesses in our hub</p>
        </div>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="md:w-1/2">
          <Input
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-1/4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All types</SelectItem>
              {businessTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Business listing */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-24 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2 mt-2"></div>
              </CardContent>
              <CardFooter>
                <div className="h-9 bg-gray-200 rounded-md w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id}>
              <CardHeader>
                <CardTitle>{business.name}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Type: {business.type.charAt(0).toUpperCase() + business.type.slice(1)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-40">
                  {business.image_url ? (
                    <img
                      src={business.image_url}
                      alt={business.name}
                      className="h-32 w-full object-cover rounded-md mb-4"
                    />
                  ) : (
                    <div className="h-32 w-full bg-gray-200 rounded-md flex items-center justify-center mb-4">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                  <p className="line-clamp-2 text-sm">
                    {business.description || 'No description available.'}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{business.rating || 'No ratings'}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({business.review_count || 0} {business.review_count === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/businesses/${business.id}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">No businesses found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
          {selectedType || searchTerm ? (
            <Button 
              onClick={() => {
                setSelectedType('');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
