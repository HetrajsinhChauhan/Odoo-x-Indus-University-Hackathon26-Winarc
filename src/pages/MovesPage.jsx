import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

const MovesPage = () => {
  const [moves, setMoves] = useState([]);
  useEffect(() => { api.get('/api/moves').then((r) => setMoves(r.data)); }, []);

  return (
    <Layout title="Move History">
      <div className="panel"><h3>Move History</h3><table><thead><tr><th>Date</th><th>Product</th><th>Operation</th><th>Warehouse</th><th>Qty</th></tr></thead><tbody>{moves.map((m) => <tr key={m._id}><td>{new Date(m.createdAt).toLocaleString()}</td><td>{m.product?.name || '—'}</td><td>{m.operation}</td><td>{m.warehouse}</td><td>{m.quantityChange}</td></tr>)}</tbody></table></div>
    </Layout>
  );
};

export default MovesPage;
