import {
  useState,
  createContext,
  useEffect,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  getLocalStorage,
  removeLocalStorage,
} from '../utils/storage';

import {
  getByToken,
} from '../libs/user';

const AuthContext = createContext();

function AuthProvider({
  children,
}) {
  const [data, setData] = useState({
    userData: null,
    token: null,
  });
  const navigate = useNavigate();

  async function validateToken(authToken) {
    try {
      const responseData = await getByToken(authToken);
      if (responseData && responseData.ok) {
        setData({
          userData: responseData.userData,
          token: authToken,
        });
      }
    } catch (e) {
      console.info('Error', e);
      removeLocalStorage('x-access-token');
      navigate('/sign-in');
    }
  }

  useEffect(() => {
    const authToken = getLocalStorage('x-access-token');
    if (authToken) {
      validateToken(authToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        setData,
        validateToken,
        logout: () => {
          removeLocalStorage('x-access-token');
          setData({
            userData: null,
            token: null,
          });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
