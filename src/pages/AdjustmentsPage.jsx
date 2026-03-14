import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

const AdjustmentsPage = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product: '', warehouse: '', countedStock: 0, note: '' });

  const load = async () => {
    const [a, p] = await Promise.all([api.get('/api/adjustments'), api.get('/api/products')]);
    setAdjustments(a.data);
    setProducts(p.data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/api/adjustments', form);
    setForm({ product: '', warehouse: '', countedStock: 0, note: '' });
    load();
  };

  return (
    <Layout title="Inventory Adjustment">
      <div className="panel">
        <h3>Create Adjustment</h3>
        <form className="form-grid" onSubmit={create}>
          <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} required>
            <option value="">Product</option>{products.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <input placeholder="Warehouse" value={form.warehouse} onChange={(e) => setForm({ ...form, warehouse: e.target.value })} required />
          <input type="number" placeholder="Counted Stock" value={form.countedStock} onChange={(e) => setForm({ ...form, countedStock: Number(e.target.value) })} required />
          <input placeholder="Note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="panel"><h3>Adjustments</h3><table><thead><tr><th>Product</th><th>Warehouse</th><th>Counted</th><th>Date</th></tr></thead><tbody>{adjustments.map((a) => <tr key={a._id}><td>{a.product?.name}</td><td>{a.warehouse}</td><td>{a.countedStock}</td><td>{new Date(a.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>
    </Layout>
  );
};

export default AdjustmentsPage;
