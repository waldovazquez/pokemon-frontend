import React, {
  useState,
  useContext,
  useEffect,
} from 'react';

import axios from 'axios';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import AuthContext from '../../context/authContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  API_URL,
} from '../../utils/constants';

import {
  setSessionStorage,
} from '../../utils/storage';

function Login() {
  const {
    data,
    setData,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    const dataToLogin = {
      email,
      password,
    };
    const response = await axios.post(`${API_URL}/user/login`, dataToLogin);
    if (response && response.data.ok) {
      setSessionStorage('x-access-token', response.data.token);
      const responseData = await axios.get(`${API_URL}/user/getbytoken?token=${response.data.token}`);
      if (responseData && responseData.data.ok) {
        setData(responseData.data.userData);
      }
    }
  }

  useEffect(() => {
    if (data.userData) navigate('/');
  }, [data]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div style={{
        display: 'flex',
        height: '100vh',
      }}
      >
        <div style={{
          textAlign: 'center',
          backgroundColor: 'aqua',
          border: '1px solid chartreuse',
          padding: '12px',
          borderRadius: '10px',
          width: '300px',
          margin: 'auto',
        }}
        >
          <h1>Login</h1>
          <div>
            <Input
              type="text"
              label="Ingrese su correo"
              placeholder="Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            />
            <Input
              type="password"
              label="Ingrese su password"
              placeholder="Password"
              value={password}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            Necesitas una cuenta?
          </p>
          <Link to="/register">Sign Up</Link>
          <Button
            type="submit"
            onClick={() => login({
              email,
              password,
            })}
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Login;
