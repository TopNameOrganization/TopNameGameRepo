import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LeaderBoardPage from "../pages/LeaderBoardPage";
import NotFound from "../pages/NotFound";
import Root from "../pages/Root";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";

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
        element: <Home />
      },
      {
        path: 'login',
        element: <SignInPage />,
      },
      {
        path: 'register',
        element: <SignUpPage />,
      },
      {
        path: 'leader-board',
        element: <LeaderBoardPage />,
      }
    ]
  },
])