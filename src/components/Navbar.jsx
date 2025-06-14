import './Navbar.css';

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🗺️</span>
          <h1 className="brand-title">Auth Map App</h1>
        </div>
        
        <div className="navbar-actions">
          <button onClick={onLogout} className="logout-btn">
            <svg className="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}