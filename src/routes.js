import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"

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
]

export default routes