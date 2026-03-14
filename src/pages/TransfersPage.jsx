import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

const TransfersPage = () => {
  const [transfers, setTransfers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ fromWarehouse: '', toWarehouse: '', product: '', quantity: 0 });

  const load = async () => {
    const [t, p] = await Promise.all([api.get('/api/transfers'), api.get('/api/products')]);
    setTransfers(t.data);
    setProducts(p.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/api/transfers', form);
    setForm({ fromWarehouse: '', toWarehouse: '', product: '', quantity: 0 });
    load();
  };

  return (
    <Layout title="Internal Transfers">
      <div className="panel">
        <h3>Create Transfer</h3>
        <form className="form-grid" onSubmit={submit}>
          <input placeholder="From Warehouse" value={form.fromWarehouse} onChange={(e) => setForm({ ...form, fromWarehouse: e.target.value })} required />
          <input placeholder="To Warehouse" value={form.toWarehouse} onChange={(e) => setForm({ ...form, toWarehouse: e.target.value })} required />
          <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} required>
            <option value="">Product</option>{products.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} required />
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
      <div className="panel"><h3>Transfers</h3><table><thead><tr><th>From</th><th>To</th><th>Product</th><th>Qty</th></tr></thead><tbody>{transfers.map((t) => <tr key={t._id}><td>{t.fromWarehouse}</td><td>{t.toWarehouse}</td><td>{t.product?.name}</td><td>{t.quantity}</td></tr>)}</tbody></table></div>
    </Layout>
  );
};

export default TransfersPage;
