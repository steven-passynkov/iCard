import React, { useState, createContext, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import storage from "../storage/storage";

//https://codesandbox.io/s/usecontext-typescript-66b3p?file=/src/components/userContext.tsx:

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = { theme: string | undefined; toggleTheme: Function };

export const ThemeContext = createContext({} as ThemeContextType);

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<string | undefined>("light");

  const changeTheme = async (theme: string) => {
    if (theme === "light") {
      setTheme("light");
      await storage.set("theme", "light");
      if (Capacitor.isPluginAvailable("StatusBar")) {
        await StatusBar.setStyle({ style: Style.Light });
      }
    }
    if (theme === "dark") {
      setTheme("dark");
      await storage.set("theme", "dark");
      if (Capacitor.isPluginAvailable("StatusBar")) {
        await StatusBar.setStyle({ style: Style.Dark });
      }
    }
  };

  const toggleTheme = async () => {
    document.body.classList.toggle("dark");
    if (document.body.className.includes("dark")) {
      changeTheme("dark");
    } else {
      changeTheme("light");
    }
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const storedTheme = await storage.get("theme");
      if (isMounted && storedTheme === "dark") {
        toggleTheme();
      } else {
        if (Capacitor.isPluginAvailable("StatusBar")) {
          await StatusBar.setStyle({ style: Style.Light });
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
