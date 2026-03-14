import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, BarChart3, Truck, Warehouse, ShieldCheck, ArrowRight, Box } from "lucide-react";

const features = [
  { icon: Package, title: "Inventory Tracking", desc: "Real-time stock levels across all locations" },
  { icon: Box, title: "Product Management", desc: "Organize products with categories and SKUs" },
  { icon: Truck, title: "Order Management", desc: "Handle receipts, deliveries, and transfers" },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Dashboard insights and stock movement charts" },
  { icon: Warehouse, title: "Multi-Warehouse", desc: "Manage stock across multiple warehouses" },
  { icon: ShieldCheck, title: "Stock Adjustments", desc: "Fix mismatches with full audit trail" },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">CoreInventory</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          Smart Inventory Management
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight max-w-3xl mx-auto leading-tight">
          CoreInventory – Smart
          <span className="text-primary"> Inventory Management</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Manage products, orders, warehouses and stock in real time. Built for modern businesses.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link to="/login">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline">Login</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground">Everything you need</h2>
          <p className="text-muted-foreground mt-2">Comprehensive inventory management in one platform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <Package className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">CoreInventory</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>About</span>
            <span>Contact</span>
            <span>GitHub</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 CoreInventory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
