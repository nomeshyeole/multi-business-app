import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Mail, Calendar, MapPin, Phone, Building, Lock, ShoppingBag, Clock, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state for profile details
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '9876543210', // Dummy data
    address: '123 Main Street, City, State, 400001', // Dummy data
    bio: 'I love shopping at Multi Business Hub!', // Dummy data
  });

  // Mock transaction history
  const recentOrders = [
    {
      id: 'ORD-2023-0123',
      date: '2023-08-15',
      items: 3,
      total: '₹4,599',
      status: 'Delivered'
    },
    {
      id: 'ORD-2023-0097',
      date: '2023-07-22',
      items: 1,
      total: '₹1,299',
      status: 'Processing'
    },
    {
      id: 'ORD-2023-0082',
      date: '2023-07-10',
      items: 2,
      total: '₹2,499',
      status: 'Cancelled'
    }
  ];

  // Mock booking history
  const bookings = [
    {
      id: 'BKG-2023-0045',
      service: 'Sports Turf',
      date: '2023-08-20',
      time: '18:00 - 20:00',
      status: 'Confirmed'
    },
    {
      id: 'BKG-2023-0039',
      service: 'Swimming Pool',
      date: '2023-08-05',
      time: '09:00 - 10:30',
      status: 'Completed'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving profile data
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  // Calculate status badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'completed':
      case 'confirmed':
        return <Badge className="bg-green-500">{ status }</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">{ status }</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">{ status }</Badge>;
      default:
        return <Badge>{ status }</Badge>;
    }
  };

  // Display initials in avatar if no user is found
  const getInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    } else if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  if (!user) {
    return (
      <div className="container mx-auto py-20">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Please log in to view your profile.</p>
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-3xl">{getInitials()}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-center">{user.name || user.username}</h2>
                <p className="text-gray-500">{user.email || 'No email provided'}</p>
                <Badge className="mt-2 bg-blue-500">Customer</Badge>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-gray-500" />
                  <span>Member since: August 2023</span>
                </div>
                <div className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{recentOrders.length} Orders</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{bookings.length} Bookings</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4 text-gray-500" />
                  <span>Loyalty Points: 450</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="account">
            <TabsList className="w-full">
              <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
              <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
              <TabsTrigger value="bookings" className="flex-1">Bookings</TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Profile Information</CardTitle>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Your phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Your address"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us a bit about yourself"
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                        <div>
                          <div className="flex items-center text-gray-500 mb-1">
                            <User className="mr-2 h-4 w-4" />
                            <span className="text-sm">Full Name</span>
                          </div>
                          <p>{formData.name || 'Not provided'}</p>
                        </div>
                        <div>
                          <div className="flex items-center text-gray-500 mb-1">
                            <Mail className="mr-2 h-4 w-4" />
                            <span className="text-sm">Email</span>
                          </div>
                          <p>{formData.email || 'Not provided'}</p>
                        </div>
                        <div>
                          <div className="flex items-center text-gray-500 mb-1">
                            <Phone className="mr-2 h-4 w-4" />
                            <span className="text-sm">Phone</span>
                          </div>
                          <p>{formData.phone}</p>
                        </div>
                        <div>
                          <div className="flex items-center text-gray-500 mb-1">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span className="text-sm">Address</span>
                          </div>
                          <p>{formData.address}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <User className="mr-2 h-4 w-4" />
                          <span className="text-sm">Bio</span>
                        </div>
                        <p>{formData.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Button variant="outline" className="flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Two-Factor Authentication
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your recent orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Order ID</th>
                            <th className="text-left py-3 px-2">Date</th>
                            <th className="text-left py-3 px-2">Items</th>
                            <th className="text-left py-3 px-2">Total</th>
                            <th className="text-left py-3 px-2">Status</th>
                            <th className="text-left py-3 px-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b">
                              <td className="py-3 px-2">{order.id}</td>
                              <td className="py-3 px-2">{order.date}</td>
                              <td className="py-3 px-2">{order.items}</td>
                              <td className="py-3 px-2">{order.total}</td>
                              <td className="py-3 px-2">
                                {getStatusBadge(order.status)}
                              </td>
                              <td className="py-3 px-2">
                                <Button variant="link" className="h-auto p-0">View Details</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="h-12 w-12 mx-auto text-gray-300" />
                      <p className="mt-2 text-gray-500">You haven't placed any orders yet.</p>
                      <Link href="/services">
                        <Button className="mt-4">Browse Services</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                  <CardDescription>View your recent service bookings and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Booking ID</th>
                            <th className="text-left py-3 px-2">Service</th>
                            <th className="text-left py-3 px-2">Date</th>
                            <th className="text-left py-3 px-2">Time</th>
                            <th className="text-left py-3 px-2">Status</th>
                            <th className="text-left py-3 px-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="border-b">
                              <td className="py-3 px-2">{booking.id}</td>
                              <td className="py-3 px-2">{booking.service}</td>
                              <td className="py-3 px-2">{booking.date}</td>
                              <td className="py-3 px-2">{booking.time}</td>
                              <td className="py-3 px-2">
                                {getStatusBadge(booking.status)}
                              </td>
                              <td className="py-3 px-2">
                                <Button variant="link" className="h-auto p-0">View Details</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-gray-300" />
                      <p className="mt-2 text-gray-500">You haven't made any bookings yet.</p>
                      <Link href="/services">
                        <Button className="mt-4">Browse Services</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
