import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Services from "@/pages/services";
import SportsTurf from "@/pages/sports-turf";
import FruitShop from "@/pages/fruit-shop";
import SwimmingPool from "@/pages/swimming-pool";
import SmartMall from "@/pages/smart-mall";
import KiranPanCenter from "@/pages/kiran-pan-center";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/sports-turf" component={SportsTurf} />
      <Route path="/services/fruit-shop" component={FruitShop} />
      <Route path="/services/swimming-pool" component={SwimmingPool} />
      <Route path="/services/smart-mall" component={SmartMall} />
      <Route path="/services/kiran-pan-center" component={KiranPanCenter} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Router />
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
