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
import Clothing from "@/pages/clothing";
import MobileServices from "@/pages/mobile-services";
import Gaming from "@/pages/gaming";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NotFound from "@/pages/not-found";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import FootwearStore from "@/pages/footwear-store";
import ElectronicsStore from "@/pages/electronics-store";
import SmartHomeDevices from "@/pages/smart-home-devices";
import CosmeticsStore from "@/pages/cosmetics-store";
import ToyStore from "@/pages/toy-store";
import Bookstore from "@/pages/bookstore";
import SportingGoodsStore from "@/pages/sporting-goods-store";
import FurnitureStore from "@/pages/furniture-store";
import SmartMallComplex from "@/pages/services/smart-mall-complex";

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
      <Route path="/services/smart-mall-complex" component={SmartMallComplex} />
      <Route path="/smart-mall/clothing" component={Clothing} />
      <Route path="/smart-mall/mobile-services" component={MobileServices} />
      <Route path="/smart-mall/gaming" component={Gaming} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/footwear-store" component={FootwearStore} />
      <Route path="/electronics-store" component={ElectronicsStore} />
      <Route path="/smart-home-devices" component={SmartHomeDevices} />
      <Route path="/cosmetics-store" component={CosmeticsStore} />
      <Route path="/toy-store" component={ToyStore} />
      <Route path="/bookstore" component={Bookstore} />
      <Route path="/sporting-goods-store" component={SportingGoodsStore} />
      <Route path="/furniture-store" component={FurnitureStore} />
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
