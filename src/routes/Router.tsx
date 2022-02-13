import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Tv = lazy(() => import('../pages/Tv'));
const Movie = lazy(() => import('../pages/Movie'));
const Latest = lazy(() => import('../pages/Latest'));
const MyList = lazy(() => import('../pages/MyList'));
const Search = lazy(() => import('../pages/Search'));
const Modal = lazy(() => import('../components/modal/Modal'));

const Router = [
  { path: "/", element: <Navigate to="/browse" />, },
  {
    path: "/browse",
    element: <Home />,
    children: [
      {
        path: ":id",
        element: <Modal />
      }
    ],
  },
  {
    path: "/tv",
    element: <Tv />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
  {
    path: "/latest",
    element: <Latest />,
  },
  {
    path: "/my-list",
    element: <MyList />,
  },
  {
    path: "/search",
    element: <Search />,
  },
];

export default Router;
