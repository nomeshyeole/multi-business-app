import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SportingGoodsStore() {
  const products = [
    {
      id: 1,
      name: "Pro Tennis Racket Set",
      category: "Tennis",
      price: "$199.99",
      description: "Professional-grade tennis racket with premium strings and carrying case.",
      image: "https://images.unsplash.com/photo-1617083278519-71db5bd1d25e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "Basketball Performance Set",
      category: "Basketball",
      price: "$89.99",
      description: "Official size basketball with inflation pump and training guide.",
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
    },
    {
      id: 3,
      name: "Hiking Gear Package",
      category: "Outdoor",
      price: "$249.99",
      description: "Complete hiking set including backpack, trekking poles, and hydration system.",
      image: "https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80"
    },
    {
      id: 4,
      name: "Premium Yoga Set",
      category: "Fitness",
      price: "$79.99",
      description: "Non-slip yoga mat with blocks, strap, and instructional materials.",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-cyan-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link href="/services/smart-mall-complex">
            <Button variant="outline" className="flex items-center gap-2 mb-6">
              <ArrowLeft size={16} /> Back to Mall Directory
            </Button>
          </Link>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">
            Sporting Goods Store
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Gear up for your active lifestyle with our premium sporting goods and outdoor equipment. 
            We offer quality products for athletes of all levels across various sports and activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden bg-white shadow-lg rounded-2xl border border-cyan-100">
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
                <Badge variant="outline" className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200 mb-3">
                  {product.category}
                </Badge>
                <p className="text-gray-600">{product.description}</p>
                <Button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
