import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import NotFound from '../pages/NotFound/NotFound'
import Root from '../pages/root/Root'
import { GamePage } from '../pages/GamePage'

export default createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'game',
        element: <GamePage />,
      },
    ],
  },
])
