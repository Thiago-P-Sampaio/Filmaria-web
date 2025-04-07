import react, { useState, useEffect } from "react"; // importação dos HOOKS | useState e useEffect
import { Link } from "react-router-dom"; // Importando o componente Link do ROUTER-DOM
import api from '../../services/api';
import './home.css';


export default function Home(){
    const [ filmes, setFilmes ] = useState([]);
    const [ loading, setLoading ] = useState(true); // Colocando um 'carregamento'

    useEffect(() => { // gerencia o ciclo de vida da página | 

        async function  lerFilmes() {
            setLoading(true); // Antes de carregar, exiba   'carregando'
        try{
            const response = await api.get('/r-api/?api=filmes');
            setFilmes(response.data); // Setando os meus filmes na variável 'filmes'
            setLoading(false) // Após carregar, retire a 'carregando'...
        } catch(error){
            console.error('Não foi possivel carregar os filmes', error) // Tratamento de erros
        }         

    }
    lerFilmes(); // carregar a função
    }, []);  // Bloquear as renderizações em Loop → '[]'

    if(loading){ // Se loading for 'true' exiba a mensagem 'carregando...'
        return(
            <div className="loading-container">
                <h2>Carregando os filmes</h2>
            </div>
        )
    }

    return ( // Renderização da minha página estrutural 'HTML'
            <div className="container">
                <div className="lista-filmes">
                    {/* O (map) irá percorrer todos os itens da minha lista para exibir cada ITEM */}
                    { filmes.map((filme) => (
                        // Passando o identificador do meu objeto
                        <article key={ filme.id }>
                            <strong>{ filme.nome }</strong>
                            <img src={ filme.foto } alt={ `Imagem do filme: ${ filme.nome }` } />
                            <Link to={ `/filme/${ filme.id }` }>Acessar</Link>  
                            
                        </article>
                    )) }
                </div>
            </div>
    );
}