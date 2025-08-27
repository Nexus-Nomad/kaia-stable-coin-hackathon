import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FanCommunity from "./pages/FanCommunity";
import Store from "./pages/Store";
import Hospital from "./pages/Hospital";
import Accommodation from "./pages/Accommodation";
import Startup from "./pages/Startup";
import IdIssuance from "./pages/IdIssuance";
import IdVerification from "./pages/IdVerification";
import Web3Passport from "./pages/Web3Passport";
import DeveloperAPI from "./pages/DeveloperAPI";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import Notice from "./pages/Notice";
import Contact from "./pages/Contact";
import FanCommunityDetail from "./pages/FanCommunityDetail";
import StoreDetail from "./pages/StoreDetail";
import HospitalDetail from "./pages/HospitalDetail";
import AccommodationDetail from "./pages/AccommodationDetail";
import StartupDetail from "./pages/StartupDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fan-community" element={<FanCommunity />} />
          <Route path="/store" element={<Store />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/startup" element={<Startup />} />
          <Route path="/id-issuance" element={<IdIssuance />} />
          <Route path="/id-verification" element={<IdVerification />} />
        <Route path="/web3-passport" element={<Web3Passport />} />
        <Route path="/developer-api" element={<DeveloperAPI />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fan-community-detail" element={<FanCommunityDetail />} />
          <Route path="/store-detail" element={<StoreDetail />} />
          <Route path="/hospital-detail" element={<HospitalDetail />} />
          <Route path="/accommodation-detail" element={<AccommodationDetail />} />
          <Route path="/startup-detail" element={<StartupDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
