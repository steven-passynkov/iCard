import { useState, useContext } from "react";
import { useSearchUsers } from "../hooks/useSearchUsers";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonSearchbar,
  useIonRouter,
} from "@ionic/react";
import { close, personCircle } from "ionicons/icons";
import { UserContext } from "../contexts/UserContext";
import Header from "../components/Header";
import Refresher from "../components/Refresher";

const Notifications: React.FC = () => {
  const { user, notifications } = useContext(UserContext);
  const router = useIonRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const { searchResults } = useSearchUsers({ searchTerm: searchValue });

  // add search bar to search for users

  const onItemclick = (id: string) => {
    if (notifications) {
      router.push(
        `/profile/${notifications
          .find((el) => el.id === `${id}`)!
          .username.replace("@", "")}`,
        "forward",
        "push"
      );
    }
  };

  return (
    <IonPage id="content">
      <Header title="Add People" />
      <IonSearchbar
        onIonChange={(event) => setSearchValue(event.detail.value || "")}
        color="light"
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      />
      <IonContent class="ion-padding" scroll-y="true">
        <Refresher onRefresh={() => console.log("refresh")} />

        {searchValue === "" ? (
          <>
            {user && notifications ? (
              <>
                {user.notifications.map((id, index) => (
                  <IonItem key={index}>
                    <IonIcon
                      slot="start"
                      size="large"
                      icon={personCircle}
                      onClick={() => onItemclick(id)}
                    />
                    <IonLabel onClick={() => onItemclick(id)}>
                      {notifications.find((el) => el.id === `${id}`)!.name}
                      <p>
                        {
                          notifications.find((el) => el.id === `${id}`)!
                            .username
                        }
                      </p>
                    </IonLabel>
                    <IonButton shape="round" size="small">
                      Accept
                    </IonButton>
                    <IonButton shape="round" size="small">
                      <IonIcon slot="icon-only" icon={close}></IonIcon>
                    </IonButton>
                  </IonItem>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>{/* need to make map from backend */}</>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
