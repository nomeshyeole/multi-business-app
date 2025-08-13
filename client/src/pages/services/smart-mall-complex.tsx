import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SmartMallComplex() {
  const stores = [
    {
      id: 1,
      name: "Footwear Store",
      description: "Premium footwear for all occasions - running, formal, casual, and hiking.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      path: "/footwear-store"
    },
    {
      id: 2,
      name: "Electronics Store",
      description: "The latest gadgets, smartphones, laptops, and accessories for tech enthusiasts.",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      path: "/electronics-store"
    },
    {
      id: 3,
      name: "Smart Home Devices",
      description: "Transform your home with cutting-edge smart devices for modern living.",
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      path: "/smart-home-devices"
    },
    {
      id: 4,
      name: "Cosmetics Store",
      description: "Premium beauty and self-care products for your daily routine.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
      path: "/cosmetics-store"
    },
    {
      id: 5,
      name: "Toy Store",
      description: "Educational and fun toys for children of all ages to inspire creativity and learning.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      path: "/toy-store"
    },
    {
      id: 6,
      name: "Bookstore",
      description: "Vast selection of books across all genres, from bestsellers to rare finds and educational materials.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80",
      path: "/bookstore"
    },
    {
      id: 7,
      name: "Sporting Goods",
      description: "Quality equipment and apparel for all sports and outdoor activities.",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
      path: "/sporting-goods-store"
    },
    {
      id: 8,
      name: "Furniture Store",
      description: "Stylish and functional furniture for every room in your home or office.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      path: "/furniture-store"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Hero Section with Smart Mall Image */}
      <div className="w-full h-96 relative mb-12 overflow-hidden">
        <img 
          src="https://i.imgur.com/GEerEAQ.jpg" 
          alt="Smart Mall Complex with digital directory" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Smart Mall Complex</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">A cutting-edge shopping destination with digital directories and green spaces.</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <Link href="/services">
            <Button variant="outline" className="flex items-center gap-2 mb-6 mx-auto">
              <ArrowLeft size={16} /> Back to Services
            </Button>
          </Link>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">
            Explore Our Stores
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Welcome to our modern shopping destination featuring a variety of specialty stores. 
            Explore our mall directory below to discover quality products and services.
          </p>
          
          <div className="inline-flex flex-wrap gap-2 justify-center mb-8">
            <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200">8 Stores</Badge>
            <Badge className="px-3 py-1 text-sm bg-green-100 text-green-800 hover:bg-green-200">Premium Brands</Badge>
            <Badge className="px-3 py-1 text-sm bg-purple-100 text-purple-800 hover:bg-purple-200">Modern Shopping</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stores.map((store) => (
            <Link key={store.id} href={store.path}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={store.image} 
                    alt={store.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-secondary mb-2">{store.name}</h3>
                  <p className="text-gray-600">{store.description}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-primary font-medium flex items-center">
                      Visit Store →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
