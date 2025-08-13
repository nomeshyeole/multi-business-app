import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/service-card";
import { ArrowLeft, Dumbbell, ShoppingCart, Waves, Apple, Leaf, Utensils, Calendar, Laptop, Truck, Phone } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Sports Turf",
      description: "Professional grade artificial turf facilities for football, cricket, and multipurpose sports activities with modern amenities.",
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Premium sports turf facility",
      icon: <Dumbbell />,
      badge: "Premium Facility",
      slug: "sports-turf"
    },
    {
      title: "Smart Mall",
      description: "Modern shopping complex with diverse retail outlets, entertainment zones, and smart technology integration for enhanced customer experience.",
      imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Modern smart shopping mall interior",
      icon: <ShoppingCart />,
      badge: "Smart Shopping",
      slug: "smart-mall"
    },
    {
      title: "Swimming Pool",
      description: "State-of-the-art swimming facilities with trained lifeguards, clean water systems, and swimming lessons for all age groups.",
      imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Clean swimming pool facility",
      icon: <Waves />,
      badge: "Aquatic Excellence",
      slug: "swimming-pool"
    },
    {
      title: "Fruit Shop",
      description: "Fresh, organic fruits sourced directly from farms. Wide variety of seasonal and exotic fruits with quality guarantee and home delivery.",
      imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Fresh fruit shop display",
      icon: <Apple />,
      badge: "Farm Fresh",
      slug: "fruit-shop"
    },
    {
      title: "Kiran Pan Center",
      description: "Traditional pan shop offering fresh betel leaves, tobacco products, snacks, and daily essentials with authentic taste and quality.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Traditional pan shop with betel leaves",
      icon: <Leaf />,
      badge: "Traditional Taste",
      slug: "kiran-pan-center"
    },
    {
      title: "Restaurant & Catering",
      description: "Multi-cuisine restaurant with professional catering services for events, parties, and corporate functions with authentic flavors.",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Professional restaurant dining area",
      icon: <Utensils />,
      badge: "Culinary Excellence",
      slug: "restaurant-catering"
    },
    {
      title: "Event Management",
      description: "Complete event planning and management services for weddings, corporate events, parties, and special occasions with professional execution.",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Professional event management setup",
      icon: <Calendar />,
      badge: "Perfect Events",
      slug: "event-management"
    },
    {
      title: "Digital Services",
      description: "Comprehensive digital solutions including web development, digital marketing, online business setup, and technology consulting services.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Modern digital workspace and computers",
      icon: <Laptop />,
      badge: "Digital Solutions",
      slug: "digital-services"
    },
    {
      title: "Logistics & Transport",
      description: "Reliable transportation and logistics solutions for goods delivery, passenger transport, and supply chain management services.",
      imageUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      imageAlt: "Professional transportation and logistics",
      icon: <Truck />,
      badge: "Reliable Transport",
      slug: "logistics-transport"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">Our Business Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of business services designed to meet diverse customer needs across multiple sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              imageAlt={service.imageAlt}
              icon={service.icon}
              badge={service.badge}
              slug={service.slug}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-secondary mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">Contact us today to learn more about our services and how we can help your business grow.</p>
              <Button className="bg-primary hover:bg-blue-700 text-white px-8 py-3 font-semibold">
                <Phone className="mr-2 h-4 w-4" />
                Contact Us Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
