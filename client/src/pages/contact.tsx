import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-pink-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">Contact Us</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Reach out to Multi Business Corporation for inquiries, support, or partnership opportunities. We are here to help you grow and succeed.
          </p>
        </div>
        <Card className="bg-white rounded-3xl shadow-2xl max-w-2xl mx-auto border border-pink-100">
          <CardContent className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Get in Touch</h3>
            <ul className="text-left space-y-6 md:space-y-4">
              <li className="flex items-center text-gray-700 text-base md:text-lg"><Phone className="mr-3 h-6 w-6 text-primary" /> <span className="font-semibold">+91-9876543210</span></li>
              <li className="flex items-center text-gray-700 text-base md:text-lg"><Mail className="mr-3 h-6 w-6 text-primary" /> <span className="font-semibold">info@multi-business.com</span></li>
              <li className="flex items-center text-gray-700 text-base md:text-lg"><MapPin className="mr-3 h-6 w-6 text-primary" /> <span className="font-semibold">123 Main Street, Your City, India</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
