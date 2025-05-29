import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  icon: React.ReactNode;
  badge: string;
  slug: string;
}

export default function ServiceCard({ title, description, imageUrl, imageAlt, icon, badge, slug }: ServiceCardProps) {
  // Check if we're in smart mall context to build correct URL
  const isSmartMallCategory = window.location.pathname === '/services/smart-mall';
  const linkUrl = isSmartMallCategory ? `/smart-mall/${slug}` : `/services/${slug}`;
  
  return (
    <Link href={linkUrl}>
      <Card className="service-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
        <img 
          src={imageUrl} 
          alt={imageAlt} 
          className="w-full h-48 object-cover"
        />
        <CardContent className="p-6">
          <div className="flex items-center mb-3">
            <div className="text-primary text-2xl mr-3">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-secondary">{title}</h3>
          </div>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-accent font-semibold">{badge}</span>
            <div className="text-primary hover:text-blue-700 transition-colors">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
