import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ElectronicsStore() {
  const products = [
    {
      id: 1,
      name: "UltraView 4K Smart TV",
      category: "Televisions",
      price: "$799.99",
      description: "55-inch 4K UHD Smart TV with HDR and built-in streaming apps.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "PowerBook Pro",
      category: "Laptops",
      price: "$1299.99",
      description: "High-performance laptop with 16GB RAM, 512GB SSD, and dedicated graphics.",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      name: "SoundWave Wireless Headphones",
      category: "Audio",
      price: "$249.99",
      description: "Premium noise-canceling wireless headphones with 30-hour battery life.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      name: "PixelMax Smartphone",
      category: "Smartphones",
      price: "$899.99",
      description: "Latest smartphone with 108MP camera, 5G connectivity, and all-day battery life.",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2329&q=80"
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
            Electronics Store
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Discover cutting-edge technology and the latest gadgets at our electronics store.
            From smartphones to home entertainment systems, we offer premium brands with expert guidance.
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
                <Badge variant="secondary" className="mb-3">
                  {product.category}
                </Badge>
                <p className="text-gray-600">{product.description}</p>
                <Button className="w-full mt-4">View Specifications</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
