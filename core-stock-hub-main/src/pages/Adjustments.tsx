import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Adjustment {
  id: string; product: string; location: string; oldQty: number; newQty: number; reason: string; date: string;
}

const initialAdjustments: Adjustment[] = [
  { id: "ADJ-001", product: "Wireless Mouse", location: "Warehouse A", oldQty: 153, newQty: 150, reason: "Physical count mismatch", date: "2026-03-10" },
  { id: "ADJ-002", product: "USB-C Cable", location: "Warehouse A", oldQty: 15, newQty: 12, reason: "Damaged items removed", date: "2026-03-12" },
];

const Adjustments = () => {
  const [adjustments, setAdjustments] = useState<Adjustment[]>(initialAdjustments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ product: "", location: "", oldQty: 0, newQty: 0, reason: "" });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.product || !form.reason) return;
    setAdjustments([{ id: `ADJ-${String(adjustments.length + 1).padStart(3, "0")}`, ...form, date: new Date().toISOString().split("T")[0] }, ...adjustments]);
    setDialogOpen(false);
    setForm({ product: "", location: "", oldQty: 0, newQty: 0, reason: "" });
    toast({ title: "Adjustment recorded" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Inventory Adjustments</h1>
          <p className="text-sm text-muted-foreground">Fix stock mismatches</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New Adjustment</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Adjustment</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Product</Label><Input value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} /></div>
                <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Old Quantity</Label><Input type="number" value={form.oldQty} onChange={(e) => setForm({ ...form, oldQty: +e.target.value })} /></div>
                <div><Label>New Quantity</Label><Input type="number" value={form.newQty} onChange={(e) => setForm({ ...form, newQty: +e.target.value })} /></div>
              </div>
              <div><Label>Reason</Label><Textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} /></div>
              <Button onClick={handleAdd}>Record Adjustment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead>ID</TableHead><TableHead>Product</TableHead><TableHead>Location</TableHead>
              <TableHead>Old Qty</TableHead><TableHead>New Qty</TableHead><TableHead>Change</TableHead>
              <TableHead>Reason</TableHead><TableHead>Date</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {adjustments.map((a) => (
                <TableRow key={a.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-xs">{a.id}</TableCell>
                  <TableCell>{a.product}</TableCell>
                  <TableCell className="text-muted-foreground">{a.location}</TableCell>
                  <TableCell>{a.oldQty}</TableCell>
                  <TableCell>{a.newQty}</TableCell>
                  <TableCell className={a.newQty - a.oldQty < 0 ? "text-destructive" : "text-success"}>
                    {a.newQty - a.oldQty > 0 ? "+" : ""}{a.newQty - a.oldQty}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">{a.reason}</TableCell>
                  <TableCell className="text-muted-foreground">{a.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Adjustments;
