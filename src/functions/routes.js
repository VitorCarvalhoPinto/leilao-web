import Home from "../pages/leilao/home"
import Leilao from "../pages/leilao/leilao"
import Login from "../pages/login/login"
import Register from "../pages/register/register"
import Perfil from "../pages/perfil/perfil"
import Bancos from "../pages/bancos/bancos"
import Entidade from "../pages/entidade/entidade"

const routes = [
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/leilao/:idLeilao' ,
        element: <Leilao/>
    },
    {
        path: '/entidade/:idEntidade' ,
        element: <Entidade/>
    },
    {
        path: '/perfil',
        element: <Perfil/>
    },
    {
        path: '/bancos',
        element: <Bancos/>
    },
]

export default routes