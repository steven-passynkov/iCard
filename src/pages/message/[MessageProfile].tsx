import { useContext, useState, useEffect } from "react";
import { useGetUser } from "../../hooks/useGetUser";
import { usePhotoGallery, UserPhoto } from "../../hooks/usePhotoGallery";
import {
  IonContent,
  IonPage,
  IonFooter,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonTextarea,
  IonImg,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import { imagesOutline } from "ionicons/icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import Header from "../../components/Header";
import Refresher from "../../components/Refresher";
import LongPress from "../../components/LongPress";
import Image from "../../components/Image";

const MessageProfile: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const router = useIonRouter();
  const { usersFound, getUserloading, getUserError } = useGetUser({
    searchTerms: [
      router.routeInfo.pathname.replace("/inbox/profile/", "").toLowerCase(),
    ],
  });
  const { photos, photoGalleryLoading, takePhoto } = usePhotoGallery();

  const [messages, setMessages] = useState<Array<any> | undefined>();
  const [inputValue, setInputValue] = useState<string | undefined | null>("");
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (user && getUserloading === false) {
      if (Object.keys(user.messages).length > 0) {
        setMessages(user.messages[usersFound[0].id]);
      }
    }
  }, [user, getUserloading]);

  return (
    <IonPage id="content">
      {getUserloading === false ? (
        <>
          <Header
            title={usersFound[0].name}
            onClickTitle={() =>
              router.push(
                `/profile/${usersFound[0].username}`,
                "forward",
                "push"
              )
            }
          />
          <IonContent scroll-y="true">
            <Refresher onRefresh={() => console.log("refresh")} />
            {user ? (
              <>
                {messages ? (
                  <>
                    {messages.map((message, index) => (
                      <div key={index}>
                        <LongPress
                          header={
                            message.type === "text"
                              ? message.content
                              : undefined
                          }
                          subHeader={
                            user.id === message.user
                              ? user.name
                              : usersFound[0].name
                          }
                          image={
                            message.type === "photo"
                              ? `https://icard-json-server.vercel.app/${message.content}`
                              : undefined
                          }
                          buttons={[
                            {
                              text: "text",
                              role: "role",
                              data: {
                                action: "action",
                              },
                            },
                          ]}
                        >
                          <IonItem lines="none">
                            <IonLabel>
                              <p>
                                {user.id === message.user ? (
                                  <>{user.name}</>
                                ) : (
                                  <>{usersFound[0].name}</>
                                )}
                              </p>
                              {message.type === "photo" ? (
                                <>
                                  <Image
                                    src={`https://icard-json-server.vercel.app/${message.content}`}
                                    alt=""
                                    keyValue={index}
                                    userName={usersFound[0].name}
                                  />
                                </>
                              ) : (
                                <>{message.content}</>
                              )}
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
          <IonFooter>
            <IonToolbar>
              <IonItem
                style={{
                  "--background": theme === "dark" ? "#1e2023" : "#f5f6f9",
                  "--highlight-background":
                    theme === "dark" ? "#ffffff" : "#000000",
                }}
                lines="none"
              >
                <IonTextarea
                  placeholder="Type something here"
                  spellcheck={true}
                  enterkeyhint="enter"
                  value={inputValue}
                  onIonChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event: any) => {
                    if (event.key === "Enter" || event.keyCode === 13) {
                      event.preventDefault();
                      if (inputValue !== "") {
                        setInputValue("");
                      }
                    }
                  }}
                  style={{ "--padding-bottom": "0" }}
                />
                <div style={{ marginTop: "10px" }}>
                  <IonButton
                    shape="round"
                    fill="clear"
                    onClick={() => takePhoto()}
                  >
                    <IonIcon icon={imagesOutline} />
                  </IonButton>
                </div>
              </IonItem>
            </IonToolbar>
          </IonFooter>
        </>
      ) : (
        <></>
      )}
    </IonPage>
  );
};

export default MessageProfile;
