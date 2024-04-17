import { useContext } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonButton,
  IonLabel,
} from "@ionic/react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Header from "../../components/Header";
import ReactQRCode from "qrcode.react";

const QRCode: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <IonPage id="content">
      <Header title="Share" />
      <IonContent class="ion-padding">
        <div
          style={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <IonItem lines="none" className="ion-text-center">
            <IonLabel style={{ marginTop: "0" }}>
              {theme === "light" ? (
                <ReactQRCode
                  renderAs="canvas"
                  value={"https://reactjs.org/"}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#3db5ff"}
                  level={"L"}
                  includeMargin={false}
                  imageSettings={{
                    src: "https://unpkg.com/ionicons@5.5.2/dist/svg/triangle-outline.svg",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              ) : (
                <ReactQRCode
                  renderAs="canvas"
                  value={"https://reactjs.org/"}
                  size={200}
                  bgColor={"#000000"}
                  fgColor={"#3db5ff"}
                  level={"L"}
                  includeMargin={false}
                  imageSettings={{
                    src: "https://unpkg.com/ionicons@5.5.2/dist/svg/triangle-outline.svg",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              )}
            </IonLabel>
          </IonItem>
          <IonItem lines="none" className="ion-text-center">
            <IonLabel>
              <IonButton expand="block">Share link</IonButton>
            </IonLabel>
            <IonLabel>
              <IonButton expand="block">Copy link</IonButton>
            </IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QRCode;
