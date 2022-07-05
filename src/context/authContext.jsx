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
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  async function updatingUserData(newToken) {
    const responseData = await axios.get(`${API_URL}/user/getbytoken?token=${newToken}`);
    if (responseData && responseData.data.ok) {
      setUserData(responseData.data.userData);
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
        userData,
        setUserData,
        token,
        setToken,
        logout: () => {
          removeSessionStorage('x-access-token');
          setUserData(null);
          setToken(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
