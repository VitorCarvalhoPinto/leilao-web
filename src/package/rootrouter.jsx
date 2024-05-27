import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import routes from '../functions/routes';

function RootRouter() {

  const id = sessionStorage.getItem('id')
  const navigate = useNavigate()
  useEffect(() => {
    if (id === null && window.location.pathname !== '/register')
      navigate('/login')  
  }, [id, navigate])
  
  return (
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} 
                  path={route.path} 
                  element={route.element}/>
          ))}
        </Routes>
    );

}


export default RootRouter;