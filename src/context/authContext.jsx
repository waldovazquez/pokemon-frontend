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
  });

  async function updatingUserData(token) {
    console.info('updatingUserData called');
    const responseData = await axios.get(`${API_URL}/user/getbytoken?token=${token}`);
    if (responseData && responseData.data) {
      setData({
        userData: responseData.data.userData,
      });
    }
  }

  useEffect(() => {
    if (getSessionStorage('x-access-token')) {
      const token = getSessionStorage('x-access-token');
      if (token) updatingUserData(token);
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
