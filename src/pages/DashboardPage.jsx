import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalProducts: 0, lowStockItems: 0, outOfStock: 0, pendingReceipts: 0, pendingDeliveries: 0, internalTransfers: 0 });
  const [activity, setActivity] = useState([]);

  const loadDashboard = async () => {
    try {
      const statsRes = await api.get('/api/products/stats');
      setStats(statsRes.data);
      const movesRes = await api.get('/api/moves');
      setActivity(movesRes.data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadDashboard(); const id = setInterval(loadDashboard, 5000); return () => clearInterval(id); }, []);

  return (
    <Layout title="Dashboard">
      <div className="stats-grid">
        <div className="card">Total Products<div className="stat-value">{stats.totalProducts}</div></div>
        <div className="card">Low Stock<div className="stat-value">{stats.lowStockItems}</div></div>
        <div className="card">Out of Stock<div className="stat-value">{stats.outOfStock}</div></div>
        <div className="card">Pending Receipts<div className="stat-value">{stats.pendingReceipts}</div></div>
        <div className="card">Pending Deliveries<div className="stat-value">{stats.pendingDeliveries}</div></div>
        <div className="card">Internal Transfers<div className="stat-value">{stats.internalTransfers}</div></div>
      </div>
      <div className="panel">
        <h3>Recent Inventory Activity</h3>
        <table>
          <thead><tr><th>Date</th><th>Product</th><th>Operation</th><th>Warehouse</th><th>Change</th></tr></thead>
          <tbody>{activity.map((i) => <tr key={i._id}><td>{new Date(i.createdAt).toLocaleString()}</td><td>{i.product?.name || '—'}</td><td>{i.operation}</td><td>{i.warehouse}</td><td>{i.quantityChange}</td></tr>)}</tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DashboardPage;
