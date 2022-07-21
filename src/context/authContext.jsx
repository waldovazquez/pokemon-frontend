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

  async function updatingData(newToken) {
    const responseData = await getByToken(newToken);
    if (responseData && responseData.ok) {
      setData({
        userData: responseData.userData,
        token: newToken,
      });
    } else {
      removeLocalStorage('x-access-token');
    }
  }

  useEffect(() => {
    const newToken = getLocalStorage('x-access-token');
    if (newToken) {
      updatingData(newToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        setData,
        updatingData,
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
