import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📝 Blog Manager
        </Link>
        <div className="navbar-menu">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Trang chủ
          </NavLink>
          <Link to="/create" className="nav-button">
            ✍️ Viết bài mới
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
