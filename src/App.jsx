import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { store } from './Redux/NoxeStore';
import { Provider } from 'react-redux';
import Details from './Components/Details/Details';
import Descover from './Components/TopRated/TopRated';
import Trending from './Components/Trending/Trending';
import Popular from './Components/Popular/Popular';
import UserContextProvider from './context/userToken';
import Protected from './Components/Protected/Protected';
import NotFound from './Components/NotFound/NotFound';

function App() {
  let routes = createHashRouter([{
    path: "", element: <Layout />, children: [{
      index: true, element: <Protected> <Home /></Protected>
    },
    { path: "/signup", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/topRated/:type", element: <Protected> <Descover /></Protected> },
    { path: '*', element: <Protected><NotFound /></Protected> },
    { path: '/detailes/:id/:type', element: <Protected><Details /></Protected> },
    { path: '/trending/:type', element: <Protected><Trending /></Protected> },
    { path: '/popular/:type', element: <Protected> <Popular /> </Protected> }
    ]
  }
  ])
  return <>
    <div className='backgroundimg'>
      <div className="container z-5">
        <UserContextProvider>
          <Provider store={store}>
            <RouterProvider router={routes}>
            </RouterProvider>
          </Provider>
        </UserContextProvider>


      </div>
    </div>
  </>
}

export default App;
