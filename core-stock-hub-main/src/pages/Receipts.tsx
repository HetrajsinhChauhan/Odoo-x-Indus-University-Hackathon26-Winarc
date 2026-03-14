import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Receipt {
  id: string; supplier: string; products: string; quantity: number; warehouse: string; status: string; date: string;
}

const statusColors: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Waiting: "bg-warning text-warning-foreground",
  Ready: "bg-primary text-primary-foreground",
  Done: "bg-success text-success-foreground",
  Canceled: "bg-destructive text-destructive-foreground",
};

const initialReceipts: Receipt[] = [
  { id: "REC-001", supplier: "TechParts Inc", products: "Wireless Mouse x50", quantity: 50, warehouse: "Warehouse A", status: "Done", date: "2026-03-10" },
  { id: "REC-002", supplier: "OfficeSupply Co", products: "Notebook A5 x200", quantity: 200, warehouse: "Warehouse A", status: "Waiting", date: "2026-03-12" },
  { id: "REC-003", supplier: "FurniCorp", products: "Office Chair x10", quantity: 10, warehouse: "Warehouse B", status: "Draft", date: "2026-03-14" },
];

const Receipts = () => {
  const [receipts, setReceipts] = useState<Receipt[]>(initialReceipts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ supplier: "", products: "", quantity: 0, warehouse: "Warehouse A" });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.supplier || !form.products) return;
    const newReceipt: Receipt = {
      id: `REC-${String(receipts.length + 1).padStart(3, "0")}`,
      ...form,
      status: "Draft",
      date: new Date().toISOString().split("T")[0],
    };
    setReceipts([newReceipt, ...receipts]);
    setDialogOpen(false);
    setForm({ supplier: "", products: "", quantity: 0, warehouse: "Warehouse A" });
    toast({ title: "Receipt created" });
  };

  const handleValidate = (id: string) => {
    setReceipts(receipts.map((r) => r.id === id ? { ...r, status: "Done" } : r));
    toast({ title: "Receipt validated", description: "Stock has been updated" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Receipts</h1>
          <p className="text-sm text-muted-foreground">Incoming stock from suppliers</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Create Receipt</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Receipt</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div><Label>Supplier</Label><Input value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} /></div>
              <div><Label>Products</Label><Input value={form.products} onChange={(e) => setForm({ ...form, products: e.target.value })} placeholder="e.g. Widget x100" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Quantity</Label><Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: +e.target.value })} /></div>
                <div><Label>Warehouse</Label><Input value={form.warehouse} onChange={(e) => setForm({ ...form, warehouse: e.target.value })} /></div>
              </div>
              <Button onClick={handleAdd}>Create Receipt</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((r) => (
                <TableRow key={r.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell>{r.supplier}</TableCell>
                  <TableCell>{r.products}</TableCell>
                  <TableCell>{r.quantity}</TableCell>
                  <TableCell className="text-muted-foreground">{r.warehouse}</TableCell>
                  <TableCell><Badge className={statusColors[r.status]}>{r.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell>
                    {r.status !== "Done" && r.status !== "Canceled" && (
                      <Button variant="outline" size="sm" onClick={() => handleValidate(r.id)}>Validate</Button>
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

export default Receipts;
