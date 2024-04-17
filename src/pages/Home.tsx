import { useContext, useEffect } from "react";
import { useLocation } from "../hooks/useLocation";
import { IonPage } from "@ionic/react";
import { personAddOutline } from "ionicons/icons";
import Map from "react-map-gl";
import { Marker } from "react-map-gl";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { AppContext } from "../contexts/AppContext";
import Header from "../components/Header";
import "mapbox-gl/dist/mapbox-gl.css";

export const pulse = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

export const PulseContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0 auto;
`;

export const Pulse = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
  animation: ${pulse} 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite;
  background-color: #86c5da;
  opacity: 0;
`;

export const WhiteDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  border-style: solid;
  border-color: #d3d3d3;
`;

const Home: React.FC = () => {
  const { coordinates, viewport, setViewport } = useContext(AppContext);

  // TODO make sure that coordinates update when moving

  const { usersFound, getLocationLoading, getLocationError } = useLocation({
    latitude: coordinates?.coords.latitude,
    longitude: coordinates?.coords.longitude,
  });

  //Map to show who is around you at events

  //Make it so when mulitiple people are in the same area you can open a modal to see all the people

  return (
    <IonPage id="content">
      <Header icon={personAddOutline} />
      <div id="main-content">
        <div style={{ width: "100vw", height: "100vh" }}>
          <Map
            reuseMaps
            {...viewport}
            style={{ width: "100%", height: "100%" }}
            pitchWithRotate={false}
            bearing={0}
            onDrag={(event) =>
              setViewport((prevViewPortState) => ({
                ...prevViewPortState,
                latitude: event.viewState.latitude,
                longitude: event.viewState.longitude,
              }))
            }
            onZoom={(event) =>
              setViewport((prevViewPortState) => ({
                ...prevViewPortState,
                zoom: event.viewState.zoom,
              }))
            }
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken="key"
          >
            {coordinates ? (
              <>
                <Marker
                  latitude={coordinates.coords.latitude}
                  longitude={coordinates.coords.longitude}
                >
                  <PulseContainer>
                    <Pulse />
                    <WhiteDot />
                  </PulseContainer>
                </Marker>
              </>
            ) : (
              <></>
            )}
            {usersFound && coordinates ? (
              <>
                {usersFound.map((user, index) => {
                  return (
                    <Marker
                      latitude={user.latitude}
                      longitude={user.longitude}
                      key={index}
                    >
                      {user.name}
                      <PulseContainer>
                        <Pulse />
                        <WhiteDot />
                      </PulseContainer>
                    </Marker>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </Map>
        </div>
      </div>
    </IonPage>
  );
};

export default Home;
