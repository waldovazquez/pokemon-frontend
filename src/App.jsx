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

const Home = React.lazy(() => import('./screens/Home'));
const About = React.lazy(() => import('./screens/About'));
const SignIn = React.lazy(() => import('./screens/SignIn'));
const SignUp = React.lazy(() => import('./screens/SignUp'));
const PokemonDetails = React.lazy(() => import('./screens/PokemonDetails'));
const NotFound = React.lazy(() => import('./screens/NotFound'));
const LandingPage = React.lazy(() => import('./screens/LandingPage'));
const PokemonCreate = React.lazy(() => import('./screens/PokemonCreate'));

function ProtectedRoute({ children }) {
  const {
    data,
  } = useContext(AuthContext);
  if (!data.userData) {
    return <SignIn />;
  }
  return children;
}

function App() {
  const {
    data,
  } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  function init() {
    const excluded = ['sign-in', 'sign-up', 'about'];
    if (data.userData) {
      if (excluded.includes(location.pathname.split('/')[1])) {
        return navigate('/home?page=1');
      }
      return navigate(location.pathname);
    }
    return null;
  }

  useEffect(() => {
    init();
  }, [data.userData]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={(
            <LandingPage />
        )}
        />
        <Route
          path="/home"
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
        )}
        />
        <Route
          path="/about"
          element={(
            <About />
          )}
        />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="pokemon/:id"
          element={(
            <ProtectedRoute>
              <PokemonDetails />
            </ProtectedRoute>
        )}
        />
        <Route
          path="pokemon/create"
          element={(
            <ProtectedRoute>
              <PokemonCreate />
            </ProtectedRoute>
        )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
