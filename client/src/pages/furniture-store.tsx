import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function FurnitureStore() {
  const products = [
    {
      id: 1,
      name: "Modern Sectional Sofa",
      category: "Living Room",
      price: "$1,299.99",
      description: "Contemporary L-shaped sectional sofa with premium upholstery and comfort cushions.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "Solid Wood Dining Set",
      category: "Dining Room",
      price: "$899.99",
      description: "Six-piece dining set with solid wood construction and comfortable upholstered chairs.",
      image: "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
    },
    {
      id: 3,
      name: "King Size Platform Bed",
      category: "Bedroom",
      price: "$849.99",
      description: "Modern platform bed frame with integrated storage and headboard.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      name: "Ergonomic Home Office Set",
      category: "Office",
      price: "$749.99",
      description: "Complete home office setup with adjustable desk, ergonomic chair, and storage solutions.",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2019&q=80"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-orange-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link href="/services/smart-mall-complex">
            <Button variant="outline" className="flex items-center gap-2 mb-6">
              <ArrowLeft size={16} /> Back to Mall Directory
            </Button>
          </Link>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">
            Furniture Store
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Transform your home with our stylish and functional furniture collections. 
            We offer quality pieces for every room, combining comfort, durability, and contemporary design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden bg-white shadow-lg rounded-2xl border border-orange-100">
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
                <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-200 mb-3">
                  {product.category}
                </Badge>
                <p className="text-gray-600">{product.description}</p>
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
