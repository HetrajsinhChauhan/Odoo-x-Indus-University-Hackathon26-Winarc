import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Receipts from "./pages/Receipts";
import Deliveries from "./pages/Deliveries";
import Transfers from "./pages/Transfers";
import Adjustments from "./pages/Adjustments";
import StockLedger from "./pages/StockLedger";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/SettingsPage";
import Profile from "./pages/Profile";
import AppLayout from "./components/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const WithLayout = ({ children }: { children: React.ReactNode }) => (
  <AppLayout>{children}</AppLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<WithLayout><Dashboard /></WithLayout>} />
          <Route path="/products" element={<WithLayout><Products /></WithLayout>} />
          <Route path="/receipts" element={<WithLayout><Receipts /></WithLayout>} />
          <Route path="/deliveries" element={<WithLayout><Deliveries /></WithLayout>} />
          <Route path="/transfers" element={<WithLayout><Transfers /></WithLayout>} />
          <Route path="/adjustments" element={<WithLayout><Adjustments /></WithLayout>} />
          <Route path="/ledger" element={<WithLayout><StockLedger /></WithLayout>} />
          <Route path="/reports" element={<WithLayout><Reports /></WithLayout>} />
          <Route path="/settings" element={<WithLayout><SettingsPage /></WithLayout>} />
          <Route path="/profile" element={<WithLayout><Profile /></WithLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
