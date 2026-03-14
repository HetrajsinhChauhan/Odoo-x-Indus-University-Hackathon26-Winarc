import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ledgerEntries = [
  { id: 1, product: "Wireless Mouse", type: "Receipt", qty: "+50", location: "Warehouse A", user: "admin@core.io", timestamp: "2026-03-10 09:15" },
  { id: 2, product: "Wireless Mouse", type: "Delivery", qty: "-20", location: "Warehouse A", user: "admin@core.io", timestamp: "2026-03-09 14:30" },
  { id: 3, product: "Wireless Mouse", type: "Transfer", qty: "-30", location: "Warehouse A → B", user: "admin@core.io", timestamp: "2026-03-08 11:00" },
  { id: 4, product: "Wireless Mouse", type: "Adjustment", qty: "-3", location: "Warehouse A", user: "admin@core.io", timestamp: "2026-03-10 16:45" },
  { id: 5, product: "USB-C Cable", type: "Adjustment", qty: "-3", location: "Warehouse A", user: "admin@core.io", timestamp: "2026-03-12 10:20" },
  { id: 6, product: "Notebook A5", type: "Receipt", qty: "+200", location: "Warehouse A", user: "admin@core.io", timestamp: "2026-03-12 08:00" },
];

const typeBadge: Record<string, string> = {
  Receipt: "bg-success text-success-foreground",
  Delivery: "bg-primary text-primary-foreground",
  Transfer: "bg-warning text-warning-foreground",
  Adjustment: "bg-muted text-muted-foreground",
};

const StockLedger = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Stock Ledger</h1>
        <p className="text-sm text-muted-foreground">Complete inventory movement history</p>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Product</TableHead><TableHead>Operation</TableHead><TableHead>Qty Change</TableHead>
              <TableHead>Location</TableHead><TableHead>User</TableHead><TableHead>Timestamp</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {ledgerEntries.map((e) => (
                <TableRow key={e.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{e.product}</TableCell>
                  <TableCell><Badge className={typeBadge[e.type]}>{e.type}</Badge></TableCell>
                  <TableCell className={e.qty.startsWith("-") ? "text-destructive font-mono" : "text-success font-mono"}>{e.qty}</TableCell>
                  <TableCell className="text-muted-foreground">{e.location}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{e.user}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{e.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockLedger;
