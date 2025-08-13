import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ToyStore() {
  const products = [
    {
      id: 1,
      name: "Interactive Learning Robot",
      category: "Educational Toys",
      price: "$69.99",
      description: "Programmable robot that teaches coding concepts to children ages 6 and up.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "Deluxe Building Block Set",
      category: "Construction Toys",
      price: "$49.99",
      description: "1000+ piece building block set compatible with all major brands for endless creativity.",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      name: "Plush Animal Collection",
      category: "Stuffed Toys",
      price: "$24.99",
      description: "Set of 5 super-soft plush animals made from hypoallergenic materials, perfect for all ages.",
      image: "https://images.unsplash.com/photo-1563901935883-10a87a757451?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80"
    },
    {
      id: 4,
      name: "Wooden Train Set",
      category: "Classic Toys",
      price: "$79.99",
      description: "Handcrafted wooden train set with 50+ pieces including tracks, trains, and scenery.",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-yellow-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link href="/services/smart-mall-complex">
            <Button variant="outline" className="flex items-center gap-2 mb-6">
              <ArrowLeft size={16} /> Back to Mall Directory
            </Button>
          </Link>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">
            Toy Store
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Discover joy and imagination at our premium toy store. We offer educational, creative, 
            and fun toys for children of all ages, carefully selected for quality and engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden bg-white shadow-lg rounded-2xl border border-yellow-100">
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
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 mb-3">
                  {product.category}
                </Badge>
                <p className="text-gray-600">{product.description}</p>
                <Button className="w-full mt-4 bg-amber-500 hover:bg-amber-600">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
