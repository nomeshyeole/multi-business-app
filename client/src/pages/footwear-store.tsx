import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FootwearStore() {
  const products = [
    {
      id: 1,
      name: "Runner's Elite",
      category: "Running Shoes",
      price: "$129.99",
      description: "Premium running shoes with advanced cushioning technology for maximum comfort.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "Business Class",
      category: "Formal Shoes",
      price: "$159.99",
      description: "Elegant formal shoes perfect for business meetings and special occasions.",
      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      name: "Urban Walker",
      category: "Casual Shoes",
      price: "$89.99",
      description: "Stylish and comfortable casual shoes for everyday wear.",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80"
    },
    {
      id: 4,
      name: "Trail Blazer",
      category: "Hiking Boots",
      price: "$149.99",
      description: "Durable hiking boots designed for challenging terrains and outdoor adventures.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
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
            Footwear Store
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Step into comfort and style with our premium collection of footwear for all occasions. 
            From athletic performance to elegant formal wear, we've got the perfect pair for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                  {product.category}
                </span>
                <p className="text-gray-600">{product.description}</p>
                <Button className="w-full mt-4">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
