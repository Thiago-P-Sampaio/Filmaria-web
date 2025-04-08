import  { useState, useEffect, Link } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api  from '../../services/api';
import './filme.css'

export default function Filme(){
    const { id } = useParams(); // Vamos pegar o ID do filme na URL

    // Vamos usar esse HOOK para navegação
    const navigate = useNavigate();

    const [ filme,         setFilme       ] =  useState(null); // Um filmE
    //    | var  | função de alterar a var|

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function lerFilme() {
            try {
                setLoading(true); ///
                const response = await api.get(`r-api/?api=filmes/${id}`)
                // Vamos verificar se o filme foi encontrado!
                // API pode retornar um array vazio ou um objeto vazio
                if(!response.data || Array.isArray(response.data) && response.data.lenght === 0){ // Todas validações possíveis
                    console.warn('Filme não encontrado, reirecionando para a Home Page') // console.warn()
                    navigate('/', { replace: true } ) // navigate( '<caminho>', { <trocar>: <sim> })
                    //Interrompe a execução da função
                    return;
                }
                setFilme(response.data); // define os dados do filme
                setLoading(false) 
            } catch(error){
                console.error('Erro ao carregar o filme', error)
            } finally {
                setLoading(false); ///
            }
            
        }

        lerFilme(); // chamada da função!
    }, [id, navigate]) // Bloquear as renderizações em Loop

    // Função para favoritar/salvar o filme
    function salvarFilme(){
        if(!filme) return; // se não há um filme, interrompe a função!

        const minhaLista = localStorage.getItem('@filmesCIA'); // Referênciar ao LOCAL-STORAGE (Google Chrome)
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const temFilme = filmesSalvos.some((filmeSalvo) => 
            filmeSalvo.id === filme.id
        )

        if(temFilme){
            toast.warn('Este filme já foi salvo') // Impedindo que salve mais de uma vez
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@filmesCIA', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
    }

    if(loading){
        return (
            <div className="loading-container">
                <h2>Carregando detalhes...</h2>
            </div>
        );
    }
    
    if (!filme) {
        return <div className='container'>Filme não encontrado.</div>;
    }


    return( // definindo os detalhes do filme em si!
        <div className="container">
            <div className="filme-info">
                <article>
                    <h1>{ filme.nome }</h1>
                    <img src={ filme.foto } alt={ `Imagem do filme: ${ filme.nome }` } />
                    <h3>Sinopse</h3>
                    <p> { filme.sinopse }</p>
                    <div className="botoes">
                        <button onClick={ salvarFilme }>Salvar</button>

                         {/* Abrir em nova pag. | camada de segurança  */}
                        <a target="_blank" rel='noopener noreferrer' 
                         href={`https://www.youtube.com/results?search_query=${encodeURIComponent(filme.nome + ' trailer')}`} className="botao-link">Trailer</a>
                    </div>
                </article>
            </div>
        </div>
    );
}