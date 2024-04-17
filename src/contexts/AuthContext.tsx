import React, { useState, createContext, useEffect, useContext } from "react";
import { useIonRouter } from "@ionic/react";
import storage from "../storage/storage";

//https://codesandbox.io/s/usecontext-typescript-66b3p?file=/src/components/userContext.tsx:

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  isLoggedIn: boolean | undefined;
  login: Function;
  logout: Function;
};

export const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useIonRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  const login = () => {
    storage.set("isloggedIn", true);
    setIsLoggedIn(true);
    router.push("/home", "forward", "push");
  };

  const logout = () => {
    //need to reset all contexts and storage
    storage.set("isloggedIn", false);
    setIsLoggedIn(false);
    router.push("/login", "forward", "push");
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const storedLoginState = await storage.get("isloggedIn");
      if (isMounted) {
        setIsLoggedIn(storedLoginState);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
