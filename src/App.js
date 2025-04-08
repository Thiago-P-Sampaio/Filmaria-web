import './App.css';

import AppRoutes from './routes/';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Verificar aqui

export default function App(){
  return(
    <div className='App'>
      <AppRoutes />
      {/* Vamos configurar o Toastify para fechar em 3 segundos */}
      <ToastContainer autoClose ={3000} position='top-right' />
        {/* Defiir o tempo de exibição  | posição     | Define para aplicação INTEIRA!*/}

    </div>
  )
}