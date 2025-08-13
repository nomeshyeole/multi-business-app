import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CosmeticsStore() {
  const products = [
    {
      id: 1,
      name: "Radiance Skin Serum",
      category: "Skincare",
      price: "$69.99",
      description: "Advanced formula with vitamin C and hyaluronic acid for glowing skin.",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80"
    },
    {
      id: 2,
      name: "Velvet Matte Lipstick Collection",
      category: "Makeup",
      price: "$39.99",
      description: "Long-lasting, cruelty-free lipsticks in six elegant shades.",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2015&q=80"
    },
    {
      id: 3,
      name: "Midnight Jasmine Perfume",
      category: "Fragrance",
      price: "$89.99",
      description: "Elegant fragrance with notes of jasmine, vanilla, and amber.",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      name: "Natural Hair Care Bundle",
      category: "Hair Care",
      price: "$59.99",
      description: "Complete set of shampoo, conditioner, and hair oil with natural ingredients.",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
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
            Cosmetics Store
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Discover beauty and self-care essentials at our premium cosmetics store. 
            We offer a curated selection of high-quality makeup, skincare, fragrance, and hair care products.
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
                <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full mb-3">
                  {product.category}
                </span>
                <p className="text-gray-600">{product.description}</p>
                <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700">Shop Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
