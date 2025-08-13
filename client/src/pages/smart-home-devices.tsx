import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SmartHomeDevices() {
  const products = [
    {
      id: 1,
      name: "HomeGuard Smart Security System",
      category: "Security",
      price: "$349.99",
      description: "Comprehensive security system with cameras, sensors, and mobile app control.",
      image: "https://images.unsplash.com/photo-1558002038-1055f5cfeb82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "EcoTemp Smart Thermostat",
      category: "Climate Control",
      price: "$129.99",
      description: "Energy-efficient smart thermostat with learning capabilities and remote control.",
      image: "https://images.unsplash.com/photo-1582820795651-e43d238cc4c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
    },
    {
      id: 3,
      name: "LuminaX Smart Lighting Kit",
      category: "Lighting",
      price: "$199.99",
      description: "Complete smart lighting solution with color-changing bulbs and scene automation.",
      image: "https://images.unsplash.com/photo-1532997622963-f01ce9e64af3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
    },
    {
      id: 4,
      name: "KitchenIQ Smart Appliance Hub",
      category: "Appliances",
      price: "$259.99",
      description: "Central hub for managing all your smart kitchen appliances with voice control.",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link href="/services/smart-mall-complex">
            <Button variant="outline" className="flex items-center gap-2 mb-6">
              <ArrowLeft size={16} /> Back to Mall Directory
            </Button>
          </Link>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">
            Smart Home Devices
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Transform your home with cutting-edge smart devices that enhance comfort, security, and efficiency.
            Our expert team can help you build an integrated smart home ecosystem tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden bg-white shadow-lg rounded-2xl border border-blue-100">
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-secondary">{product.name}</h3>
                  <span className="text-primary font-semibold">{product.price}</span>
                </div>
                <Badge variant="outline" className="mb-3">
                  {product.category}
                </Badge>
                <p className="text-gray-600">{product.description}</p>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
