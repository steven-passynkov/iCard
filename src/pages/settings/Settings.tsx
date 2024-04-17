import { useContext } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  useIonAlert,
} from "@ionic/react";
import {
  arrowForwardOutline,
  locationOutline,
  moonOutline,
  logOutOutline,
} from "ionicons/icons";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "../../components/Header";

const Settings: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [presentAlert] = useIonAlert();

  return (
    <IonPage id="content">
      <Header title="Settings" />
      <IonContent scroll-y="true" class="ion-padding">
        <IonList>
          <IonItem
            detail
            detailIcon={arrowForwardOutline}
            button
            routerLink="/settings/location"
            routerDirection="forward"
            className="ion-align-self-center"
          >
            <IonIcon slot="start" size="large" icon={locationOutline} />
            <IonLabel>Location</IonLabel>
          </IonItem>
          <IonItem
            detail
            detailIcon={arrowForwardOutline}
            button
            routerLink="/settings/theme"
            routerDirection="forward"
            className="ion-align-self-center"
          >
            <IonIcon slot="start" size="large" icon={moonOutline} />
            <IonLabel>Theme</IonLabel>
          </IonItem>
          <IonItem
            onClick={() =>
              presentAlert({
                header: "Are you sure you want to log out?",
                buttons: [
                  {
                    text: "Cancel",
                    role: "cancel",
                  },
                  {
                    text: "Logout",
                    role: "confirm",
                    handler: () => {
                      logout();
                    },
                  },
                ],
              })
            }
          >
            <IonIcon slot="start" size="large" icon={logOutOutline} />
            <IonLabel>Log Out</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
