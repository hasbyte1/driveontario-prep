import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PremiumProvider } from "@/contexts/PremiumContext";
import { AuthModal } from "@/components/AuthModal";
import { PaywallModal } from "@/components/PaywallModal";
import Dashboard from "./pages/Dashboard";
import PracticeSelection from "./pages/PracticeSelection";
import PracticeTest from "./pages/PracticeTest";
import TestResults from "./pages/TestResults";
import Flashcards from "./pages/Flashcards";
import Progress from "./pages/Progress";
import Handbook from "./pages/Handbook";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PremiumProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthModal />
          <PaywallModal />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/practice-selection" element={<PracticeSelection />} />
              <Route path="/practice" element={<PracticeTest />} />
              <Route path="/test-results" element={<TestResults />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/handbook" element={<Handbook />} />
              <Route path="/premium" element={<Premium />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PremiumProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
