import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [warehouses, setWarehouses] = useState(["Warehouse A", "Warehouse B"]);
  const [categories, setCategories] = useState(["Electronics", "Furniture", "Stationery"]);
  const [newWarehouse, setNewWarehouse] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage system configuration</p>
      </div>
      <Tabs defaultValue="warehouses">
        <TabsList>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="reorder">Reorder Rules</TabsTrigger>
        </TabsList>
        <TabsContent value="warehouses" className="mt-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Warehouses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="New warehouse name" value={newWarehouse} onChange={(e) => setNewWarehouse(e.target.value)} className="max-w-xs" />
                <Button onClick={() => { if (newWarehouse) { setWarehouses([...warehouses, newWarehouse]); setNewWarehouse(""); toast({ title: "Warehouse added" }); } }}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {warehouses.map((w, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span>{w}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { setWarehouses(warehouses.filter((_, j) => j !== i)); toast({ title: "Warehouse deleted" }); }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="mt-4">
          <Card className="border-border">
            <CardHeader><CardTitle className="text-base">Categories</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="New category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="max-w-xs" />
                <Button onClick={() => { if (newCategory) { setCategories([...categories, newCategory]); setNewCategory(""); toast({ title: "Category added" }); } }}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {categories.map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span>{c}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { setCategories(categories.filter((_, j) => j !== i)); toast({ title: "Category deleted" }); }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reorder" className="mt-4">
          <Card className="border-border">
            <CardHeader><CardTitle className="text-base">Reorder Rules</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Configure reorder levels per product in the Products module. Low stock alerts trigger automatically when stock falls below the reorder level.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
