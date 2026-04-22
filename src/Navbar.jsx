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
        </nav>
    );
}
export default Navbar;