import React, { useState, createContext, useEffect, useContext } from "react";
import { User, Users } from "../types/User.types";
import { AppContext } from "./AppContext";
import storage from "../storage/storage";
import Axios from "axios";

//https://codesandbox.io/s/usecontext-typescript-66b3p?file=/src/components/userContext.tsx:

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User | undefined;
  //setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  notifications: Users | undefined;
  inbox: Users | undefined;
};

export const UserContext = createContext({} as UserContextType);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const { networkStatus } = useContext(AppContext);

  const [user, setUser] = useState<User | undefined>();
  const [notifications, setNotifications] = useState<Users | undefined>();
  const [inbox, setInbox] = useState<Users | undefined>();

  useEffect(() => {
    if (networkStatus) {
      if (networkStatus.connected === true) {
        Axios.get(
          `https://icard-backend.vercel.app/user?id=cd673c4d-cded-4239-a838-d3437559e767`
        )
          .then((response) => {
            setUser(response.data[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [networkStatus]);

  useEffect(() => {
    if (networkStatus && user) {
      if (networkStatus.connected === true) {
        //notifications
        Axios.post("https://icard-backend.vercel.app/users", {
          ids: [...user.notifications],
        })
          .then((response) => {
            setNotifications(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        //inbox
        Axios.post("https://icard-backend.vercel.app/users", {
          ids: [...Object.keys(user.messages)],
        })
          .then((response) => {
            setInbox(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [networkStatus, user]);

  useEffect(() => {
    if (user) {
      storage.set("user", user);
    }
    if (notifications) {
      storage.set("notifications", notifications);
    }
    if (inbox) {
      storage.set("inbox", inbox);
    }
  }, [user, notifications, inbox]);

  return (
    <UserContext.Provider
      value={{
        user,
        notifications,
        inbox,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
