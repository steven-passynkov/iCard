import { useState, useEffect, useContext } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonFooter,
  IonContent,
  IonToolbar,
  IonTitle,
  IonSpinner,
  IonIcon,
} from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";
import { ThemeContext } from "../contexts/ThemeContext";

export const Image: React.FC<{
  src: any;
  alt: string;
  keyValue: any;
  userName: string;
}> = ({ src, alt, keyValue, userName }) => {
  const { theme } = useContext(ThemeContext);

  const [imageGallary, setImageGallary] = useState(false);
  const [imageGallaryPositon, setImageGallaryPosition] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //when closed set imageGallary to false
  //on mobile onhold the image grows in size and stops longpress

  return (
    <>
      {isLoading && <IonSpinner name="dots" />}
      <img
        src={src}
        alt={alt}
        key={keyValue}
        onClick={() => setImageGallary(true)}
        height="150 px"
        width="150 px"
        style={{
          display: isLoading ? "none" : "block",
        }}
        onLoad={() => setIsLoading(false)}
      />
      <IonModal isOpen={imageGallary}>
        <IonHeader>
          <IonToolbar
            style={{
              "--background": "#000000",
            }}
          >
            <IonTitle style={{ "--color": "#ffffff" }}>{userName}</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => setImageGallary(false)}
                style={{ "--color": "#ffffff" }}
              >
                <IonIcon icon={chevronDownOutline} size="small" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent scroll-y="false" style={{ "--background": "#000000" }}>
          <img
            src={src}
            style={{
              // backgroundPosition: "center center",
              // backgroundRepeat: "no-repeat",
              // backgroundSize: "contain",
              // width: "100vw",
              // height: "100vh",
              objectFit: "cover",
            }}
          />
        </IonContent>
        <IonFooter>
          <IonToolbar
            style={{
              "--background": "#000000",
            }}
          />
        </IonFooter>
      </IonModal>
    </>
  );
};

export default Image;
