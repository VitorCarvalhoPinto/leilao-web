import { useNavigate } from "react-router-dom";
import RootRouter from "./package/rootrouter";
import './style.css';

function App() {

  const id = sessionStorage.getItem('id')
  const navigate = useNavigate()

  return (
    <div className="App">
      {id && <div className="sidebar">
            <button onClick={() => navigate('/home')} className="sidebar-button">Leilões</button>
            <button onClick={() => navigate('/bancos')} className="sidebar-button">Instutuições Financeiras</button>
            <button onClick={() => navigate('/perfil')} className="sidebar-button">Perfil</button>
        </div>

      }

      <div className="content">
        <RootRouter/>
      </div>
    </div>
  );
}

export default App;
