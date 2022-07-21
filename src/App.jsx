import React, {
  useContext,
  useEffect,
  Suspense,
} from 'react';

import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import AuthContext from './context/authContext';

import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Loading from './components/Loading';

import ProtectedRoute from './utils/ProtectedRoute';

const Home = React.lazy(() => import('./screens/Home'));
const SignIn = React.lazy(() => import('./screens/SignIn'));
const SignUp = React.lazy(() => import('./screens/SignUp'));
const PokemonDetails = React.lazy(() => import('./screens/PokemonDetails'));
const NotFound = React.lazy(() => import('./screens/NotFound'));
const LandingPage = React.lazy(() => import('./screens/LandingPage'));
const PokemonCreate = React.lazy(() => import('./screens/PokemonCreate'));
const Favorites = React.lazy(() => import('./screens/Favorites'));
const Profile = React.lazy(() => import('./screens/Profile'));
const MyPokemon = React.lazy(() => import('./screens/MyPokemon'));

function App() {
  const {
    data,
  } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  function init() {
    const excluded = ['sign-in', 'sign-up'];

    if (data.userData) {
      if (excluded.includes(location.pathname.split('/')[1])) {
        return navigate(`/home${location.search}`);
      }
      return navigate(`${location.pathname}${location.search}`);
    }
    return null;
  }

  useEffect(() => {
    init();
  }, [data.userData]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Home />} path="home" />
          <Route element={<Favorites />} path="favorites" />
          <Route element={<MyPokemon />} path="pokemon/my-pokemon" />
          <Route element={<PokemonDetails />} path="pokemon/:id" />
          <Route element={<PokemonCreate />} path="pokemon/create" />
          <Route element={<Profile />} path="profile" />
        </Route>
        <Route path="/" element={(<LandingPage />)} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
