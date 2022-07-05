import React, {
  useEffect,
  useContext,
} from 'react';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import AuthContext from './context/authContext';

import Home from './screens/Home';
import About from './screens/About';
import Login from './screens/Login';
import Register from './screens/Register';

import './App.css';

function App() {
  const {
    data,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.userData === null) {
      return navigate('/login');
    }
    return navigate('/');
  }, [data]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
