import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  username: string;
  private: boolean;
  accounts: Array<any>;
  contacts: Array<any>;
  messages: { [key: string]: Array<any> };
  notifications: Array<any>;
}

interface UseGetUserProps {
  searchTerm?: string;
}

export const useSearchUsers = ({ searchTerm = "" }: UseGetUserProps = {}) => {
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const searchNames = async () => {
    try {
      const response = await axios.get("https://icard-json-server.vercel.app/users", {
        params: {
          q: searchTerm,
        },
      });
      const results = response.data;
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching names:", error);
    }
  };

  return {
    searchResults,
    searchNames,
  };
};
