import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Reports = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Reports</h1>
      <p className="text-sm text-muted-foreground">Analytics and export options</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["Stock Summary", "Movement Report", "Low Stock Report", "Warehouse Utilization", "Order History", "Adjustment Log"].map((r) => (
        <Card key={r} className="border-border hover:shadow-sm transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> {r}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Generate and export {r.toLowerCase()} as CSV or PDF.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Reports;
