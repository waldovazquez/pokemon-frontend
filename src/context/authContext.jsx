import {
  useState,
  createContext,
  useEffect,
} from 'react';

import axios from 'axios';

import {
  getSessionStorage,
  removeSessionStorage,
} from '../utils/storage';

import {
  API_URL,
} from '../utils/constants';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [data, setData] = useState({
    userData: null,
    token: null,
  });

  async function updatingUserData(newToken) {
    const responseData = await axios.get(`${API_URL}/user/getbytoken?token=${newToken}`);
    if (responseData && responseData.data.ok) {
      setData({
        userData: responseData.data.userData,
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
