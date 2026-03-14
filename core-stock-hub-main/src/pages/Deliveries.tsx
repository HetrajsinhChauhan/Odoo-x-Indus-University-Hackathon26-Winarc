import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Delivery {
  id: string; customer: string; products: string; quantity: number; status: string; date: string;
}

const statusColors: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Picking: "bg-warning text-warning-foreground",
  Packed: "bg-primary text-primary-foreground",
  Done: "bg-success text-success-foreground",
  Canceled: "bg-destructive text-destructive-foreground",
};

const initialDeliveries: Delivery[] = [
  { id: "DEL-001", customer: "Acme Corp", products: "Wireless Mouse x20", quantity: 20, status: "Done", date: "2026-03-09" },
  { id: "DEL-002", customer: "Beta LLC", products: "USB-C Cable x50", quantity: 50, status: "Picking", date: "2026-03-13" },
];

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ customer: "", products: "", quantity: 0 });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.customer || !form.products) return;
    setDeliveries([{ id: `DEL-${String(deliveries.length + 1).padStart(3, "0")}`, ...form, status: "Draft", date: new Date().toISOString().split("T")[0] }, ...deliveries]);
    setDialogOpen(false);
    setForm({ customer: "", products: "", quantity: 0 });
    toast({ title: "Delivery order created" });
  };

  const handleValidate = (id: string) => {
    setDeliveries(deliveries.map((d) => d.id === id ? { ...d, status: "Done" } : d));
    toast({ title: "Delivery validated", description: "Stock has been decreased" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Delivery Orders</h1>
          <p className="text-sm text-muted-foreground">Outgoing stock to customers</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Create Delivery</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Delivery Order</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div><Label>Customer</Label><Input value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} /></div>
              <div><Label>Products</Label><Input value={form.products} onChange={(e) => setForm({ ...form, products: e.target.value })} /></div>
              <div><Label>Quantity</Label><Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: +e.target.value })} /></div>
              <Button onClick={handleAdd}>Create Delivery</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Order ID</TableHead><TableHead>Customer</TableHead><TableHead>Products</TableHead>
              <TableHead>Qty</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Action</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {deliveries.map((d) => (
                <TableRow key={d.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-xs">{d.id}</TableCell>
                  <TableCell>{d.customer}</TableCell>
                  <TableCell>{d.products}</TableCell>
                  <TableCell>{d.quantity}</TableCell>
                  <TableCell><Badge className={statusColors[d.status]}>{d.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{d.date}</TableCell>
                  <TableCell>
                    {d.status !== "Done" && d.status !== "Canceled" && (
                      <Button variant="outline" size="sm" onClick={() => handleValidate(d.id)}>Validate</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deliveries;
