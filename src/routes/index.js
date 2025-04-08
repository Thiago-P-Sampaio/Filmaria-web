import { BrowserRouter, Route, Routes } from "react-router-dom";

 // Principais agentes de configurações do SITE
// Controlar todas as rotas da página em termos de navegação

import Header from "../components/Header";
import Home from "../pages/Home";
import Filme from "../pages/Filme";
import Favoritos from "../pages/Favoritos";

// Controlar todas as rotas da página em termos de navegação

export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
                {/* Caminho para HOME */}
            <Route path='/' element= { <Home /> }/>
                {/* Caminho para determinado FILME  */}
            <Route path='/filme/:id' element= { <Filme /> }/>
                {/* Caminho para os Favoritos */}
            <Route path='/favoritos' element= { <Favoritos /> }/>
        </Routes>
        </BrowserRouter>
    );
}