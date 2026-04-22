import { Link } from 'react-router';
function Navbar() {
    return (
        <nav>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/projects">Proiecte</Link>
        <br></br>
        <Link to="/contact">Contact</Link>
        <br></br>
        </nav>
    );
}
export default Navbar;