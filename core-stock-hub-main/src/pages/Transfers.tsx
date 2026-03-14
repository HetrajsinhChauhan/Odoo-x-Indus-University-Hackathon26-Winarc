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

interface Transfer {
  id: string; from: string; to: string; products: string; quantity: number; status: string; date: string;
}

const initialTransfers: Transfer[] = [
  { id: "TRF-001", from: "Warehouse A", to: "Warehouse B", products: "Wireless Mouse x30", quantity: 30, status: "Done", date: "2026-03-08" },
  { id: "TRF-002", from: "Warehouse B", to: "Warehouse A", products: "Office Chair x5", quantity: 5, status: "Draft", date: "2026-03-14" },
];

const Transfers = () => {
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ from: "", to: "", products: "", quantity: 0 });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.from || !form.to || !form.products) return;
    setTransfers([{ id: `TRF-${String(transfers.length + 1).padStart(3, "0")}`, ...form, status: "Draft", date: new Date().toISOString().split("T")[0] }, ...transfers]);
    setDialogOpen(false);
    setForm({ from: "", to: "", products: "", quantity: 0 });
    toast({ title: "Transfer created" });
  };

  const handleValidate = (id: string) => {
    setTransfers(transfers.map((t) => t.id === id ? { ...t, status: "Done" } : t));
    toast({ title: "Transfer validated" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Internal Transfers</h1>
          <p className="text-sm text-muted-foreground">Move stock between warehouses</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New Transfer</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Transfer</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>From</Label><Input value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} /></div>
                <div><Label>To</Label><Input value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} /></div>
              </div>
              <div><Label>Products</Label><Input value={form.products} onChange={(e) => setForm({ ...form, products: e.target.value })} /></div>
              <div><Label>Quantity</Label><Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: +e.target.value })} /></div>
              <Button onClick={handleAdd}>Create Transfer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Transfer ID</TableHead><TableHead>From</TableHead><TableHead>To</TableHead>
              <TableHead>Products</TableHead><TableHead>Qty</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Action</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {transfers.map((t) => (
                <TableRow key={t.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>{t.from}</TableCell>
                  <TableCell>{t.to}</TableCell>
                  <TableCell>{t.products}</TableCell>
                  <TableCell>{t.quantity}</TableCell>
                  <TableCell><Badge className={t.status === "Done" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}>{t.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{t.date}</TableCell>
                  <TableCell>
                    {t.status !== "Done" && <Button variant="outline" size="sm" onClick={() => handleValidate(t.id)}>Validate</Button>}
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

export default Transfers;
