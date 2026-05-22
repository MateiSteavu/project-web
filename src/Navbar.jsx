import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          Matei Steavu
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
            Proiecte
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contact
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
export default Navbar;