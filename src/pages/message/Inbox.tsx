import { useContext } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { UserContext } from "../../contexts/UserContext";
import Header from "../../components/Header";
import LongPress from "../../components/LongPress";
import Refresher from "../../components/Refresher";

const Inbox: React.FC = () => {
  const { user, inbox } = useContext(UserContext);
  const router = useIonRouter();

  const handleClick = (event: any, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(
      `/profile/${inbox
        ?.find((el) => el.id === id)!
        .username.replace("@", "")}`,
      "forward",
      "push"
    );
  };

  return (
    <IonPage id="content">
      <Header title="Messages" />
      <IonContent scroll-y="true" className="ion-padding">
        <Refresher onRefresh={() => console.log("refresh")} />
        {user && inbox ? (
          <>
            {Object.keys(user.messages).length > 0 ? (
              <>
                {Object.keys(user.messages).map((id, index) => (
                  <div key={index}>
                  <LongPress
                    buttons={[
                      {
                        text: "text",
                      },
                    ]}
                  >
                    <IonItem
                      detail
                      onClick={() =>
                        router.push(
                          `/inbox/profile/${inbox
                            ?.find((el) => el.id === id)!
                            .username.replace("@", "")}`,
                          "forward",
                          "push"
                        )
                      }
                    >
                      <IonIcon
                        slot="start"
                        size="large"
                        icon={personCircle}
                        onClick={(event) => handleClick(event, id)}
                      />
                      <IonLabel>
                        {inbox.find((el) => el.id === `${id}`)!.name}
                        <p>
                          {
                            user.messages[id][user.messages[id].length - 1]
                              .content
                          }
                        </p>
                      </IonLabel>
                    </IonItem>
                  </LongPress>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Inbox;
