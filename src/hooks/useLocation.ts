import { useState, useEffect } from "react";
import { User } from "../types/User.types";
import axios from "axios";

interface UseLocationProps {
  latitude?: number;
  longitude?: number;
}

export const useLocation = ({ latitude, longitude }: UseLocationProps = {}) => {
  const [usersFound, setUsersFound] = useState<User[]>([]);
  const [getLocationLoading, setGetLocationLoading] = useState<boolean>(true);
  const [getLocationError, setGetLocationError] = useState<Error | null>(null);

  const fetchLocation = async () => {
    setGetLocationLoading(true);
    try {
      const response = await axios.post(
        "https://icard-backend.vercel.app/localUsers",
        {
          latitude: latitude,
          longitude: longitude,
        }
      );
      setUsersFound(response.data);
      setGetLocationLoading(false);
    } catch (error) {
      setGetLocationError(error as Error);
    }
  };

  useEffect(() => {
    (async () => {
      if (getLocationLoading === true && latitude && longitude) {
        await fetchLocation();
      }
    })();
  }, [latitude, longitude, getLocationLoading]);

  return { usersFound, getLocationLoading, getLocationError };
};
