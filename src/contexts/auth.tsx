import { createContext, useState, useEffect } from "react";

import useAuthentication from "../hooks/useAuthentication";

type AuthContextData = {
  isSignedIn: boolean;
  user: object | null;
  loading: boolean;
  Login(data: any): Promise<void>;
  Logout(): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);
  const { login, logout, getUser } = useAuthentication();

  useEffect(() => {
    function simulateAsyncOperation() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Conteúdo carregado!");
        }, 1000); // Simula uma operação assíncrona que leva 3 segundos
      });
    }

    const checkLoggedIn = async () => {
      await simulateAsyncOperation();
      const response = await getUser();

      if (response) setUser(response[0]);

      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ AuthProvider ~ user:", user);
  }, [user]);

  const Login = async (data: any) => {
    const date = new Date();
    data["exp"] = new Date(new Date(date).setHours(date.getHours() + 12));
    const response = await login(data);

    setUser(response);
  };

  const Logout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isSignedIn: Boolean(user), user, loading, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
