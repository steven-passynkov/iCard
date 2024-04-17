import { useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import {
  personCircle,
  chatbubblesOutline,
  peopleCircleOutline,
  settingsOutline,
  qrCodeOutline,
  linkOutline,
} from "ionicons/icons";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
import ShareActionSheet from "./ShareActionSheet";

export const HeaderMenu: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const router = useIonRouter();

  return (
    <>
      {user ? (
        <IonMenu contentId="main-content">
          <IonContent
            scroll-y={false}
            className="ion-padding"
            style={{ "--padding-top": "0" }}
          >
            <IonHeader className="ion-no-border">
              <IonToolbar
                style={{
                  "--background": theme === "dark" ? "#000000" : "#ffffff",
                  "--padding-start": "0",
                }}
              >
                <IonItem lines="none">
                  <IonLabel style={{ marginBottom: "0" }}>
                    <IonIcon
                      slot="icon-only"
                      size="large"
                      icon={personCircle}
                    />
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel style={{ marginTop: "0" }}>
                    {user.name}
                    <p>{user.username}</p>
                  </IonLabel>
                  <IonButton
                    fill="clear"
                    shape="round"
                    routerLink="/settings"
                    routerDirection="forward"
                  >
                    <IonIcon size="small" icon={settingsOutline} />
                  </IonButton>
                </IonItem>
              </IonToolbar>
            </IonHeader>
            <IonList lines="none">
              <IonItem
                button
                onClick={() =>
                  router.push(
                    `/profile/${user.username.replace("@", "")}`,
                    "forward",
                    "push"
                  )
                }
              >
                <IonIcon
                  color="primary"
                  size="large"
                  icon={personCircle}
                  style={{ marginRight: "5px" }}
                />
                <IonLabel>My profile</IonLabel>
              </IonItem>
              <IonItem button routerLink="/accounts" routerDirection="forward">
                <IonIcon
                  color="primary"
                  size="large"
                  icon={peopleCircleOutline}
                  style={{ marginRight: "5px" }}
                />
                <IonLabel>My Accounts</IonLabel>
              </IonItem>
              <IonItem button routerLink="/inbox" routerDirection="forward">
                <IonIcon
                  color="primary"
                  size="large"
                  icon={chatbubblesOutline}
                  style={{ marginRight: "5px" }}
                />
                <IonLabel>Messages</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
          <div style={{ padding: "16px" }}>
            <IonList lines="none">
              <IonItem lines="inset" />
              <IonItem
                button
                routerLink="/share/qrcode"
                routerDirection="forward"
              >
                <IonIcon
                  color="primary"
                  size="large"
                  icon={qrCodeOutline}
                  style={{ marginRight: "5px" }}
                />
                <IonLabel>Share QR code</IonLabel>
              </IonItem>
              <ShareActionSheet>
                <IonItem button>
                  <IonIcon
                    color="primary"
                    size="large"
                    icon={linkOutline}
                    style={{ marginRight: "5px" }}
                  />
                  <IonLabel>Share Link</IonLabel>
                </IonItem>
              </ShareActionSheet>
            </IonList>
          </div>
        </IonMenu>
      ) : (
        <></>
      )}
    </>
  );
};

export default HeaderMenu;
