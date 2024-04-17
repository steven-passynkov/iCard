import { useState, useEffect } from "react";
import { User } from "../types/User.types";
import axios from "axios";

interface UseGetUserProps {
  userIds?: string[];
  searchTerms?: string[];
}

export const useGetUser = ({
  userIds = [],
  searchTerms = [],
}: UseGetUserProps = {}) => {
  const [usersFound, setUsersFound] = useState<User[]>([]);
  const [getUserloading, setGetUserloading] = useState<boolean>(true);
  const [getUserError, setGetUserError] = useState<Error | null>(null);

  //can only search only one id or username

  const fetchUsers = async () => {
    setGetUserloading(true);

    try {
      if (searchTerms.length > 0) {
        // const response = await axios.get(
        //   `https://icard-json-server.vercel.app/users?username=@${searchTerms.join(
        //     ",@"
        //   )}`
        // );
        const response = await axios.get(
          `https://icard-backend.vercel.app/user?username=${searchTerms}`
        );
        setUsersFound(response.data);
        setGetUserloading(false);
      } else if (userIds.length > 0) {
        const response = await axios.get(
          `https://icard-json-server.vercel.app/users?id=${userIds.join(
            "&id="
          )}`
        );
        setUsersFound(response.data);
        setGetUserloading(false);
      }
    } catch (error) {
      setGetUserError(error as Error);
    } finally {
      //console.log("loaded");
      //setGetUserloading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (getUserloading === true) {
        await fetchUsers();
      }
    })();
  }, [searchTerms, userIds, getUserloading]);

  return { usersFound, getUserloading, getUserError };
};
