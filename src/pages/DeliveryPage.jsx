import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

const DeliveryPage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ orderId: '', customer: '', warehouse: '', product: '', quantity: 0, status: 'Pending' });

  const load = async () => {
    const [o, p] = await Promise.all([api.get('/api/delivery'), api.get('/api/products')]);
    setOrders(o.data);
    setProducts(p.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/api/delivery', form);
    setForm({ orderId: '', customer: '', warehouse: '', product: '', quantity: 0, status: 'Pending' });
    load();
  };

  return (
    <Layout title="Delivery Orders">
      <div className="panel">
        <h3>Create Delivery</h3>
        <form className="form-grid" onSubmit={submit}>
          <input placeholder="Order ID" value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} required />
          <input placeholder="Customer" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} required />
          <input placeholder="Warehouse" value={form.warehouse} onChange={(e) => setForm({ ...form, warehouse: e.target.value })} required />
          <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} required>
            <option value="">Product</option>{products.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} required />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Pending</option><option>Done</option></select>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
      <div className="panel"><h3>Deliveries</h3><table><thead><tr><th>Order ID</th><th>Customer</th><th>Warehouse</th><th>Product</th><th>Qty</th><th>Status</th></tr></thead><tbody>{orders.map((o) => <tr key={o._id}><td>{o.orderId}</td><td>{o.customer}</td><td>{o.warehouse}</td><td>{o.product?.name}</td><td>{o.quantity}</td><td>{o.status}</td></tr>)}</tbody></table></div>
    </Layout>
  );
};

export default DeliveryPage;
