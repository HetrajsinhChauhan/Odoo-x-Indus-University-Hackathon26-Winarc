import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="landing-card">
        <h1>Inventory Management System</h1>
        <p>Fast, secure IMS for products, receipts, orders, and stock adjustments.</p>
        <div className="landing-actions">
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-outline" onClick={() => navigate('/login')}>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
