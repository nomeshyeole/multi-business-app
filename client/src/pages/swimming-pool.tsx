import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Waves, Phone, Mail, CheckCircle, Star, Shield } from "lucide-react";

export default function SwimmingPool() {
  const services = [
    {
      name: "Daily Swimming Pass",
      duration: "Full day access",
      price: "₹200",
      capacity: "Individual",
      features: ["Pool access 6AM-10PM", "Locker facility", "Towel service", "Basic swimming equipment"]
    },
    {
      name: "Swimming Lessons",
      duration: "45 minutes/session",
      price: "₹800",
      capacity: "1-on-1 coaching",
      features: ["Certified instructor", "Beginner to advanced", "Progress tracking", "Safety equipment included"]
    },
    {
      name: "Group Swimming Classes",
      duration: "60 minutes",
      price: "₹500",
      capacity: "6-8 participants",
      features: ["Professional coach", "Age-specific groups", "Water safety training", "Fun activities"]
    },
    {
      name: "Pool Party Package",
      duration: "4 hours",
      price: "₹5,000",
      capacity: "Up to 25 people",
      features: ["Private pool access", "Party decorations", "Lifeguard service", "Refreshment area"]
    }
  ];

  const facilities = [
    "Olympic size swimming pool (50m)",
    "Children's pool with safety features",
    "Professional lifeguards on duty",
    "Advanced water filtration system",
    "Temperature controlled water",
    "Modern changing rooms with lockers",
    "Pool side cafeteria",
    "First aid station",
    "Swimming equipment rental",
    "Underwater LED lighting",
    "CCTV surveillance",
    "Aqua aerobics classes"
  ];

  const timings = [
    { slot: "Early Morning", time: "6:00 AM - 8:00 AM", price: "₹150", type: "Lap swimming" },
    { slot: "Morning", time: "8:00 AM - 12:00 PM", price: "₹200", type: "General swimming" },
    { slot: "Afternoon", time: "12:00 PM - 5:00 PM", price: "₹200", type: "Family time" },
    { slot: "Evening", time: "5:00 PM - 8:00 PM", price: "₹250", type: "Peak hours" },
    { slot: "Night", time: "8:00 PM - 10:00 PM", price: "₹200", type: "Relaxed swimming" }
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
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Swimming pool facility" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Swimming Pool Complex</h1>
                <p className="text-xl">State-of-the-art aquatic facilities for all ages</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Services & Pricing */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Swimming Services & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-lg text-secondary">{service.name}</h3>
                          <Badge variant="secondary" className="bg-accent text-white">{service.price}</Badge>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="mr-2 h-4 w-4" />
                            <span>{service.capacity}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="mr-2 h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Slots */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Daily Time Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timings.map((timing, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Waves className="mr-3 h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold text-secondary">{timing.slot}</p>
                          <p className="text-sm text-gray-600">{timing.time} - {timing.type}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-accent border-accent">{timing.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Pool Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Pool Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Waves className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Pool Size</p>
                    <p className="text-sm text-gray-600">Olympic Standard 50m</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-sm text-gray-600">6:00 AM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="mr-3 h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Safety Standards</p>
                    <p className="text-sm text-gray-600">Certified lifeguards</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="mr-3 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Rating</p>
                    <p className="text-sm text-gray-600">4.9/5 (85+ reviews)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Membership */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Membership Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-secondary">Monthly Pass</p>
                  <p className="text-2xl font-bold text-primary">₹3,500</p>
                  <p className="text-sm text-gray-600">Unlimited access + 1 guest pass</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-secondary">Annual Pass</p>
                  <p className="text-2xl font-bold text-accent">₹35,000</p>
                  <p className="text-sm text-gray-600">Best value + family benefits</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Book Your Slot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-primary hover:bg-blue-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Call: +91-9876543210
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Booking
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Advance booking recommended during peak hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}