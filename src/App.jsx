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
import Loading from './components/Loading';

const Home = React.lazy(() => import('./screens/Home'));
const About = React.lazy(() => import('./screens/About'));
const Login = React.lazy(() => import('./screens/Login'));
const Register = React.lazy(() => import('./screens/Register'));
const PokemonDetails = React.lazy(() => import('./screens/PokemonDetails'));
const NotFound = React.lazy(() => import('./screens/NotFound'));
const LandingPage = React.lazy(() => import('./screens/LandingPage'));
const PokemonCreate = React.lazy(() => import('./screens/PokemonCreate'));

function ProtectedRoute({ children }) {
  const context = useContext(AuthContext);
  if (context.userData === null) {
    return <Login />;
  }
  return children;
}

function App() {
  const context = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  function init() {
    const excluded = ['login', 'register'];
    if (context.userData) {
      if (excluded.includes(location.pathname.split('/')[1])) {
        return navigate('/home?page=1');
      }
      return navigate(location.pathname);
    }
    return null;
  }

  useEffect(() => {
    init();
  }, [context.userData]);

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
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          )}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
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
