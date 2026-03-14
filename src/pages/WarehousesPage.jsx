import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

const WarehousesPage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', manager: '' });

  const load = async () => { const res = await api.get('/api/warehouses'); setWarehouses(res.data); };
  useEffect(() => { load(); }, []);

  const create = async (e) => { e.preventDefault(); await api.post('/api/warehouses', form); setForm({ name: '', location: '', manager: '' }); load(); };

  return (
    <Layout title="Warehouse Settings">
      <div className="panel">
        <h3>Create Warehouse</h3>
        <form className="form-grid" onSubmit={create}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          <input placeholder="Manager" value={form.manager} onChange={(e) => setForm({ ...form, manager: e.target.value })} required />
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
      <div className="panel"><h3>Warehouses</h3><table><thead><tr><th>Name</th><th>Location</th><th>Manager</th></tr></thead><tbody>{warehouses.map((w) => <tr key={w._id}><td>{w.name}</td><td>{w.location}</td><td>{w.manager}</td></tr>)}</tbody></table></div>
    </Layout>
  );
};

export default WarehousesPage;
