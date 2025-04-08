import { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // pop-ups 'mágicos'
import './favoritos.css';



export default function Favoritos(){
    const [ filmes, setFilmes ] = useState([]);
    const [ loading, setLoading]  = useState(true);

    useEffect(() => {
        setLoading(true);
        try{
            const minhaLista = localStorage.getItem('@filmesCIA');
            setFilmes(JSON.parse(minhaLista) || []);

        } catch(error){
            console.error('Erro ao ler os filmes favoritos', error);
            toast.error('Erro ao carregar os  filmes favoritos'); //Pop-up  de erro
            setFilmes([]) // Passando um objeto vazio caso de erro
        } finally {
            setLoading(false)
        }
    }, [])

    function Deletar(id){
        const confirmar = window.confirm('Deseja deletar o filme?'); // Pop-up de confirmaçã
        if(!confirmar) return; // caso ele recusar!!
        try{
            const filmeFavoritados = filmes.filter((item) => item.id !== id ) // filtrar pelo filme que está la dentro
            setFilmes(filmeFavoritados)
            localStorage.setItem('@filmesCIA', JSON.stringify(filmeFavoritados)) // Atualizar o LocalStorage
            toast.success('Filme removido com sucesso')
        } catch(error){
            console.error('Erro ao excluir o filme do localStorage', error);
            toast.error('Erro ao excluir o filme!');

        }
    }

    if(loading) {
        return(
            <div className="loading-container">
                <h2>Carregando favoritos...</h2>
            </div>
        );
    }


    return (
    <div className="container">
        <div className="meus-filmes">
            <h1>Meus Filmes Favoritos</h1>
            { filmes.length === 0 && ( // Caso não haja filmes salvos!
                <span className="lista-vazia"> 
                    Nenhum filme salvo!
                </span>
            ) }
            
            <ul>
                {filmes.map((item) => (
                    <li key={ item.id }>
                        {/* verificar aqui */}
                        <span>{ item.nome }</span> 
                        <div className="acoes">
                            <Link to={ `/filme/${ item.id }` }>
                            Ver detalhes
                            </Link>
                            <button onClick={ () => Deletar(item.id) }>
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
}
