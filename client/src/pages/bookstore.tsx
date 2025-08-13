import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Bookstore() {
  const products = [
    {
      id: 1,
      name: "Modern Fiction Collection",
      category: "Fiction",
      price: "$49.99",
      description: "Bundle of five bestselling contemporary novels from award-winning authors.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
    },
    {
      id: 2,
      name: "Business Strategy Handbook",
      category: "Business",
      price: "$34.99",
      description: "Comprehensive guide to modern business strategies with case studies from global companies.",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2012&q=80"
    },
    {
      id: 3,
      name: "Illustrated World Atlas",
      category: "Reference",
      price: "$59.99",
      description: "Beautifully illustrated world atlas with detailed maps and cultural information.",
      image: "https://images.unsplash.com/photo-1569498860984-52b490bf5e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      name: "Children's Adventure Series",
      category: "Children's Books",
      price: "$29.99",
      description: "Collection of illustrated adventure books for children ages 6-10, promoting reading skills and imagination.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link href="/services/smart-mall-complex">
            <Button variant="outline" className="flex items-center gap-2 mb-6">
              <ArrowLeft size={16} /> Back to Mall Directory
            </Button>
          </Link>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">
            Bookstore
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Discover worlds of knowledge and imagination at our bookstore. 
            Browse our curated collection of bestsellers, classics, and specialty titles for readers of all ages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden bg-white shadow-lg rounded-2xl border border-emerald-100">
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
                <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 mb-3">
                  {product.category}
                </Badge>
                <p className="text-gray-600">{product.description}</p>
                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
