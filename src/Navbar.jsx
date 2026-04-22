import { NavLink } from 'react-router';
function Navbar() {
    return (
        <nav>
        <NavLink to="/">Home</NavLink>
        <br></br>
        <NavLink to="/projects">Proiecte</NavLink>
        <br></br>
        <NavLink to="/contact">Contact</NavLink>
        <br></br>
        <NavLink to="/about">About</NavLink>
        </nav>
    );
}
export default Navbar;