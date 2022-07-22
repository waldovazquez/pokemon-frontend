import {
  useState,
  createContext,
  useEffect,
} from 'react';

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
