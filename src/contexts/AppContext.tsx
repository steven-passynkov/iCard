import React, { useState, createContext, useEffect } from "react";
import { Capacitor, PluginListenerHandle } from "@capacitor/core";
import { Device, DeviceInfo } from "@capacitor/device";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Geolocation, Position } from "@capacitor/geolocation";
//import { Motion, Acceleration, RotationRate } from "@capacitor/motion";
import { Network, ConnectionStatus } from "@capacitor/network";
import { Camera } from "@capacitor/camera";
import storage from "../storage/storage";

//https://codesandbox.io/s/usecontext-typescript-66b3p?file=/src/components/themeContext.tsx:0-408

type AppContextProviderProps = {
  children: React.ReactNode;
};

type AppContextType = {
  location: string | undefined;
  toggleLocation: Function;
  viewport: {
    latitude: number;
    longitude: number;
    zoom: number;
    maxZoom: number;
    minZoom: number;
  };
  setViewport: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
      zoom: number;
      maxZoom: number;
      minZoom: number;
    }>
  >;
  permissions: {
    location: string;
    coarseLocation: string;
    camera: string;
    photos: string;
  };
  coordinates: Position | null;
  networkStatus: ConnectionStatus | undefined;
};

export const AppContext = createContext({} as AppContextType);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [location, setLocation] = useState<string | undefined>("private");
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
    maxZoom: 20,
    minZoom: 1,
  });
  const [permissions, setPermissions] = useState({
    location: "",
    coarseLocation: "",
    camera: "",
    photos: "",
  });
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | undefined>();
  const [coordinates, setCoordinates] = useState<Position | null>(null);
  const [motion, setMotion] = useState();
  const [networkStatus, setNetworkStatus] = useState<
    ConnectionStatus | undefined
  >();

  const checkPermissions = async () => {
    const coordinatesPermissions = await Geolocation.checkPermissions();
    const cameraPermissions = await Camera.checkPermissions();
    setPermissions((prevPermissionsState) => ({
      ...prevPermissionsState,
      location: coordinatesPermissions.location,
      coarseLocation: coordinatesPermissions.coarseLocation,
      camera: cameraPermissions.camera,
      photos: cameraPermissions.photos,
    }));
  };

  const requestCoordinatesPermissions = async () => {
    const coordinatesPermissions = await Geolocation.requestPermissions();
    setPermissions((prevPermissionsState) => ({
      ...prevPermissionsState,
      location: coordinatesPermissions.location,
      coarseLocation: coordinatesPermissions.coarseLocation,
    }));
  };

  const requestCameraPermissions = async () => {
    const cameraPermissions = await Camera.requestPermissions();
    setPermissions((prevPermissionsState) => ({
      ...prevPermissionsState,
      camera: cameraPermissions.camera,
      photos: cameraPermissions.photos,
    }));
  };

  const logDeviceInfo = async () => {
    setDeviceInfo(await Device.getInfo());
  };

  const getPosition = async () => {
    setCoordinates(
      await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
    );
  };

  Geolocation.watchPosition({ enableHighAccuracy: true }, (position, error) => {
    if (position) {
      setCoordinates(position);
    }
    if (error) {
      //console.log(error);
    }
  });

  const logCurrentNetworkStatus = async () => {
    setNetworkStatus(await Network.getStatus());
  };

  Network.addListener("networkStatusChange", () => {
    logCurrentNetworkStatus();
  });

  const toggleLocation = async () => {
    if (location === "public") {
      setLocation("private");
      await storage.set("location", "private");
    }
    if (location === "private") {
      setLocation("public");
      await storage.set("location", "public");
    }
  };

  useEffect(() => {
    checkPermissions();
    getPosition();
    logDeviceInfo();
    logCurrentNetworkStatus();
  }, []);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const storedLocation = await storage.get("location");
      if (isMounted && storedLocation === "public") {
        toggleLocation();
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (coordinates) {
      setViewport((prevViewPortState) => ({
        ...prevViewPortState,
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        zoom: 10,
      }));
    }
  }, [coordinates]);

  return (
    <AppContext.Provider
      value={{
        location,
        toggleLocation,
        viewport,
        setViewport,
        permissions,
        coordinates,
        networkStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
