import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', sku: '', category: '', unit: '', stock: 0 });

  const loadProducts = async () => {
    const res = await api.get('/api/products');
    setProducts(res.data);
  };

  useEffect(() => { loadProducts(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post('/api/products', form);
    setForm({ name: '', sku: '', category: '', unit: '', stock: 0 });
    await loadProducts();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/products/${id}`);
    await loadProducts();
  };

  return (
    <Layout title="Products">
      <div className="flex-wrap">
        <div className="panel">
          <h3>Create Product</h3>
          <form className="form-grid" onSubmit={handleCreate}>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required />
            <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input placeholder="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
            <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
            <button className="btn btn-primary">Add Product</button>
          </form>
        </div>
      </div>
      <div className="panel">
        <h3>Products</h3>
        <table>
          <thead><tr><th>Name</th><th>SKU</th><th>Category</th><th>Unit</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map((p) => <tr key={p._id}><td>{p.name}</td><td>{p.sku}</td><td>{p.category}</td><td>{p.unit}</td><td>{p.stock}</td><td><button className="btn btn-outline" onClick={() => handleDelete(p._id)}>Delete</button></td></tr>)}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProductsPage;
