import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unit: string;
  stock: number;
  warehouse: string;
  reorderLevel: number;
}

const initialProducts: Product[] = [
  { id: "1", name: "Wireless Mouse", sku: "WM-001", category: "Electronics", unit: "pcs", stock: 150, warehouse: "Warehouse A", reorderLevel: 20 },
  { id: "2", name: "USB-C Cable", sku: "UC-002", category: "Electronics", unit: "pcs", stock: 12, warehouse: "Warehouse A", reorderLevel: 50 },
  { id: "3", name: "Office Chair", sku: "OC-003", category: "Furniture", unit: "pcs", stock: 0, warehouse: "Warehouse B", reorderLevel: 5 },
  { id: "4", name: "Notebook A5", sku: "NB-004", category: "Stationery", unit: "pcs", stock: 340, warehouse: "Warehouse A", reorderLevel: 100 },
  { id: "5", name: "Monitor Stand", sku: "MS-005", category: "Furniture", unit: "pcs", stock: 8, warehouse: "Warehouse B", reorderLevel: 10 },
];

const categories = ["All", "Electronics", "Furniture", "Stationery"];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({ name: "", sku: "", category: "Electronics", unit: "pcs", stock: 0, warehouse: "Warehouse A", reorderLevel: 10 });

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const getStockBadge = (stock: number, reorder: number) => {
    if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
    if (stock <= reorder) return <Badge className="bg-warning text-warning-foreground">Low Stock</Badge>;
    return <Badge className="bg-success text-success-foreground">In Stock</Badge>;
  };

  const handleSave = () => {
    if (!form.name || !form.sku) return;
    if (editProduct) {
      setProducts(products.map((p) => p.id === editProduct.id ? { ...p, ...form } : p));
      toast({ title: "Product updated" });
    } else {
      setProducts([...products, { ...form, id: Date.now().toString() }]);
      toast({ title: "Product added" });
    }
    setDialogOpen(false);
    setEditProduct(null);
    setForm({ name: "", sku: "", category: "Electronics", unit: "pcs", stock: 0, warehouse: "Warehouse A", reorderLevel: 10 });
  };

  const handleEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, sku: p.sku, category: p.category, unit: p.unit, stock: p.stock, warehouse: p.warehouse, reorderLevel: p.reorderLevel });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({ title: "Product deleted" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">{products.length} products total</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditProduct(null); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><Label>SKU</Label><Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== "All").map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Unit</Label><Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })} /></div>
                <div><Label>Reorder Level</Label><Input type="number" value={form.reorderLevel} onChange={(e) => setForm({ ...form, reorderLevel: +e.target.value })} /></div>
                <div><Label>Warehouse</Label><Input value={form.warehouse} onChange={(e) => setForm({ ...form, warehouse: e.target.value })} /></div>
              </div>
              <Button onClick={handleSave}>{editProduct ? "Update" : "Add Product"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{p.sku}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.stock} {p.unit}</TableCell>
                  <TableCell className="text-muted-foreground">{p.warehouse}</TableCell>
                  <TableCell>{getStockBadge(p.stock, p.reorderLevel)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(p)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
