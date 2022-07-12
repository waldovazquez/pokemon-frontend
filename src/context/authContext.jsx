import {
  useState,
  createContext,
  useEffect,
} from 'react';

import {
  getSessionStorage,
  removeSessionStorage,
} from '../utils/storage';

import {
  getByToken,
} from '../libs/user';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [data, setData] = useState({
    userData: null,
    token: null,
  });

  async function updatingUserData(newToken) {
    const responseData = await getByToken(newToken);
    if (responseData && responseData.ok) {
      setData({
        userData: responseData.userData,
        token: newToken,
      });
    }
  }

  useEffect(() => {
    const newToken = getSessionStorage('x-access-token');
    if (newToken) {
      updatingUserData(newToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        setData,
        logout: () => {
          removeSessionStorage('x-access-token');
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
