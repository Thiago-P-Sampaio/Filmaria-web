import { Link } from "react-router-dom";
import './styles.css';

export default function Header(){
    return (
        <header>
            {/* Link para página principal */}
            <Link to='/' className="logo">Filmaria</Link> 
            {/* Link para página favoritos */}
            <Link to='/favoritos' className="favoritos">Salvos</Link>
        </header>

    );
}