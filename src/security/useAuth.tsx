import { useEffect, useState } from 'react';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuthStore } from '../store';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const token = user?.access;
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token || '');
        const expirationTime = decodedToken?.exp ?? 0;
        const isTokenExpired = expirationTime * 1000 < Date.now();
        if (isTokenExpired) {
          logout();
          setShouldRedirect(true);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        logout();
        setShouldRedirect(true);
      }
    } else {
      setShouldRedirect(true);
    }
  }, [logout, user]);

  return { isAuthenticated, shouldRedirect };
};

export default useAuth;
