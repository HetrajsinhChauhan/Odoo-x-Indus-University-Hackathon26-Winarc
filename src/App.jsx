import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landingpage from './Admin/landingpage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ReceiptsPage from './pages/ReceiptsPage';
import DeliveryPage from './pages/DeliveryPage';
import TransfersPage from './pages/TransfersPage';
import AdjustmentsPage from './pages/AdjustmentsPage';
import WarehousesPage from './pages/WarehousesPage';
import MovesPage from './pages/MovesPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
        <Route path="/receipts" element={<PrivateRoute><ReceiptsPage /></PrivateRoute>} />
        <Route path="/delivery" element={<PrivateRoute><DeliveryPage /></PrivateRoute>} />
        <Route path="/transfers" element={<PrivateRoute><TransfersPage /></PrivateRoute>} />
        <Route path="/adjustments" element={<PrivateRoute><AdjustmentsPage /></PrivateRoute>} />
        <Route path="/warehouses" element={<PrivateRoute><WarehousesPage /></PrivateRoute>} />
        <Route path="/moves" element={<PrivateRoute><MovesPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

