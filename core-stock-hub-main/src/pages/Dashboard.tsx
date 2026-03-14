import { Package, AlertTriangle, XCircle, ClipboardList, Truck, ArrowLeftRight, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const metrics = [
  { label: "Total Products", value: "248", icon: Package, trend: "+12", color: "text-primary" },
  { label: "Low Stock Items", value: "18", icon: AlertTriangle, trend: "-3", color: "text-warning" },
  { label: "Out of Stock", value: "4", icon: XCircle, trend: "+1", color: "text-destructive" },
  { label: "Pending Receipts", value: "7", icon: ClipboardList, trend: "+2", color: "text-primary" },
  { label: "Pending Deliveries", value: "12", icon: Truck, trend: "-1", color: "text-success" },
  { label: "Internal Transfers", value: "3", icon: ArrowLeftRight, trend: "0", color: "text-muted-foreground" },
];

const stockData = [
  { month: "Jan", inbound: 120, outbound: 80 },
  { month: "Feb", inbound: 150, outbound: 110 },
  { month: "Mar", inbound: 180, outbound: 130 },
  { month: "Apr", inbound: 140, outbound: 160 },
  { month: "May", inbound: 200, outbound: 140 },
  { month: "Jun", inbound: 170, outbound: 150 },
];

const activityData = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 19 },
  { day: "Wed", orders: 8 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 15 },
  { day: "Sat", orders: 6 },
  { day: "Sun", orders: 3 },
];

const quickActions = [
  { label: "Add Product", icon: Plus, to: "/products" },
  { label: "Create Receipt", icon: ClipboardList, to: "/receipts" },
  { label: "Create Delivery", icon: Truck, to: "/deliveries" },
  { label: "Transfer Stock", icon: ArrowLeftRight, to: "/transfers" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Inventory overview and quick actions</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} className="border-border hover:shadow-sm transition-shadow">
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-center justify-between mb-2">
                <m.icon className={`h-4 w-4 ${m.color}`} />
                <span className={`text-xs font-medium ${
                  m.trend.startsWith("+") ? "text-success" : m.trend.startsWith("-") ? "text-destructive" : "text-muted-foreground"
                }`}>
                  {m.trend !== "0" && m.trend}
                </span>
              </div>
              <p className="text-2xl font-semibold text-foreground">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        {quickActions.map((a) => (
          <Link key={a.label} to={a.to}>
            <Button variant="outline" size="sm" className="gap-2">
              <a.icon className="h-4 w-4" /> {a.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Stock Movement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="inbound" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="outbound" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Order Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
