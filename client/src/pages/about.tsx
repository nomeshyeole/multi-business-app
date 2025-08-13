import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">
            About Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Multi Business Corporation is dedicated to providing excellence in
            business services across multiple sectors. Our mission is to empower
            local businesses and communities with modern solutions, professional
            expertise, and a customer-first approach.
          </p>
        </div>
        <Card className="bg-white rounded-3xl shadow-2xl max-w-2xl mx-auto border border-blue-100">
          <CardContent className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
              Our Team
            </h3>
            <p className="text-gray-600 mb-6 text-base md:text-lg">
              Our team consists of experienced professionals in retail,
              hospitality, technology, and event management. We believe in
              collaboration, innovation, and integrity.
            </p>
            <ul className="text-left list-disc list-inside text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <li>Business Consultants</li>
              <li>Technology Experts</li>
              <li>Customer Service Specialists</li>
              <li>Event Managers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
