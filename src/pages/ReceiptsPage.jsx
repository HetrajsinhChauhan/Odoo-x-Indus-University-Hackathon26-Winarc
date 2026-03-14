import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

const ReceiptsPage = () => {
  const [receipts, setReceipts] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ receiptId: '', supplier: '', warehouse: '', product: '', quantity: 0, status: 'Pending' });

  const load = async () => {
    const [r, p] = await Promise.all([api.get('/api/receipts'), api.get('/api/products')]);
    setReceipts(r.data);
    setProducts(p.data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => { e.preventDefault(); await api.post('/api/receipts', form); setForm({ receiptId: '', supplier: '', warehouse: '', product: '', quantity: 0, status: 'Pending' }); await load(); };

  return (
    <Layout title="Receipts">
      <div className="panel">
        <h3>Create Receipt</h3>
        <form className="form-grid" onSubmit={create}>
          <input placeholder="Receipt ID" value={form.receiptId} onChange={(e) => setForm({ ...form, receiptId: e.target.value })} required />
          <input placeholder="Supplier" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} required />
          <input placeholder="Warehouse" value={form.warehouse} onChange={(e) => setForm({ ...form, warehouse: e.target.value })} required />
          <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} required>
            <option value="">Select product</option>{products.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} required />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Pending</option><option>Done</option></select>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
      <div className="panel"><h3>Receipts</h3><table><thead><tr><th>ID</th><th>Supplier</th><th>Warehouse</th><th>Product</th><th>Qty</th><th>Status</th></tr></thead><tbody>{receipts.map((r) => <tr key={r._id}><td>{r.receiptId}</td><td>{r.supplier}</td><td>{r.warehouse}</td><td>{r.product?.name}</td><td>{r.quantity}</td><td>{r.status}</td></tr>)}</tbody></table></div>
    </Layout>
  );
};

export default ReceiptsPage;
