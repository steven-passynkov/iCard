import { useState, useContext, useRef } from "react";
import { useGetUser } from "../../hooks/useGetUser";
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonItem,
  IonList,
  IonLabel,
  IonBadge,
  IonChip,
  IonButton,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import { personCircle, ellipsisVerticalOutline, pin, addOutline } from "ionicons/icons";
import { UserContext } from "../../contexts/UserContext";
import { Platforms } from "../../types/Platforms.types";
import Header from "../../components/Header";
import EditProfile from "../../components/EditProfile";
import AddTag from "../../components/AddTag";
import ShareActionSheet from "../../components/ShareActionSheet";
import SheetModal from "../../components/SheetModal";
import Icon from "../../components/Icon";

const Profile: React.FC = () => {
  const { user, notifications } = useContext(UserContext);
  const router = useIonRouter();

  const { usersFound, getUserloading, getUserError } = useGetUser({
    searchTerms: [
      router.routeInfo.pathname.replace("/profile/", "").toLowerCase(),
    ],
  });

  const [inputValue, setSearchTerm] = useState<string | undefined>();

  return (
    <IonPage id="content">
      {getUserloading === false && user && notifications ? (
        <>
          {user.id === usersFound[0].id ? (
            <>
              <Header title={usersFound[0].username} notifications={false} />
              <IonContent class="ion-padding" scroll-y="true">
                <IonItem lines="none" className="ion-text-center">
                  <IonLabel>
                    <div>
                      <IonIcon size="large" icon={personCircle} />
                    </div>
                    <IonLabel>{usersFound[0].name}</IonLabel>
                    <IonLabel>
                      <p>{usersFound[0].username}</p>
                    </IonLabel>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" className="ion-text-center">
                  <IonLabel>
                    <div>
                      <IonBadge>500</IonBadge>
                    </div>
                    Folowers
                  </IonLabel>
                  <IonLabel>
                    <div>
                      <IonBadge>100</IonBadge>
                    </div>
                    Following
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel class="ion-text-wrap">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec ultrices posuere lacus, id volutpat eros.
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonChip>
                    <IonIcon icon={pin} />
                    <IonLabel>Toronto</IonLabel>
                  </IonChip>
                  <IonChip id="open-add-tag-modal">
                    <IonIcon icon={addOutline} />
                    <IonLabel>Add Tag</IonLabel>
                  </IonChip>
                </IonItem>
                <IonItem lines="none" className="ion-text-center">
                  <IonLabel>
                    <IonButton id="open-edit-profile-modal" expand="block">
                      Edit profile
                    </IonButton>
                  </IonLabel>
                  <IonLabel>
                    <IonButton expand="block" id="open-share-profile-modal">
                      Share profile
                    </IonButton>
                  </IonLabel>
                </IonItem>
                <IonSearchbar
                  placeholder="Search"
                  onIonChange={(event) => setSearchTerm(event.detail.value)}
                  color="light"
                />
                {usersFound[0].platforms &&
                Object.keys(usersFound[0].platforms).length > 0 ? (
                  <>
                    {Object.entries(usersFound[0].platforms).filter(
                      ([platform]) =>
                        platform
                          .toLowerCase()
                          .includes(inputValue?.toLowerCase() || "")
                    ).length > 0 ? (
                      <IonList>
                        {Object.entries(usersFound[0].platforms)
                          .filter(([platform]) =>
                            platform
                              .toLowerCase()
                              .includes(inputValue?.toLowerCase() || "")
                          )
                          .map(([platform, username], index) => (
                            <IonItem
                              key={index}
                              className="ion-align-self-center"
                            >
                              <Icon icon={platform as keyof Platforms} />
                              <IonLabel>
                                Follow on {platform}
                                <p>{username}</p>
                              </IonLabel>
                              <IonButton color="tertiary">View</IonButton>
                            </IonItem>
                          ))}
                      </IonList>
                    ) : (
                      <>
                        <IonItem className="ion-text-center" lines="none">
                          <IonLabel>Nothing found</IonLabel>
                        </IonItem>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <IonItem className="ion-text-center" lines="none">
                      <IonLabel>No Contact Info</IonLabel>
                    </IonItem>
                  </>
                )}

                <EditProfile
                  name={usersFound[0].name}
                  username={usersFound[0].username}
                />
                <AddTag />
                <SheetModal
                  trigger="open-share-profile-modal"
                  buttons={[
                    {
                      text: "QR code",
                      handler: () =>
                        router.push("/share/qrcode", "forward", "push"),
                    },
                    { text: "Share", handler: () => <ShareActionSheet /> },
                  ]}
                />
              </IonContent>
            </>
          ) : (
            <>
              <Header
                title={usersFound[0].username}
                icon={ellipsisVerticalOutline}
                notifications={false}
                id="open-options-modal"
              />
              <IonContent class="ion-padding" scroll-y="true">
                {notifications.find(
                  (el) =>
                    el.username ===
                    `${router.routeInfo.pathname.replace("/profile/", "")}`
                ) ? (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <IonLabel>
                        Do you want to add <a>{usersFound[0].username}</a>
                      </IonLabel>
                    </div>

                    <IonItem lines="full" className="ion-text-center">
                      <IonLabel>
                        <IonButton expand="block">Accept</IonButton>
                      </IonLabel>
                      <IonLabel>
                        <IonButton expand="block">Decline</IonButton>
                      </IonLabel>
                    </IonItem>
                  </>
                ) : (
                  <></>
                )}
                <IonItem lines="none" className="ion-text-center">
                  <IonLabel>
                    <div>
                      <IonIcon size="large" icon={personCircle} />
                    </div>
                    <IonLabel>{usersFound[0].name}</IonLabel>
                    <IonLabel>
                      <p>{usersFound[0].username}</p>
                    </IonLabel>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" className="ion-text-center">
                  <IonLabel>
                    <div>
                      <IonBadge>500</IonBadge>
                    </div>
                    Folowers
                  </IonLabel>
                  <IonLabel>
                    <div>
                      <IonBadge>100</IonBadge>
                    </div>
                    Following
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel class="ion-text-wrap">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec ultrices posuere lacus, id volutpat eros.
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonChip>
                    <IonIcon icon={pin} />
                    <IonLabel>Toronto</IonLabel>
                  </IonChip>
                </IonItem>
                <IonItem lines="none" className="ion-text-center">
                  <IonLabel>
                    <IonButton expand="block">Follow</IonButton>
                  </IonLabel>
                  <IonLabel>
                    <IonButton
                      expand="block"
                      onClick={() =>
                        router.push(
                          `/inbox/profile/${router.routeInfo.pathname.replace(
                            "/profile/",
                            ""
                          )}`,
                          "forward",
                          "push"
                        )
                      }
                    >
                      Message
                    </IonButton>
                  </IonLabel>
                </IonItem>
                <IonSearchbar
                  placeholder="Search"
                  onIonChange={(event) => setSearchTerm(event.detail.value)}
                  color="light"
                />
                {usersFound[0].private === false ? (
                  <>
                    {usersFound[0].platforms &&
                    Object.keys(usersFound[0].platforms).length > 0 ? (
                      <>
                        {Object.entries(usersFound[0].platforms).filter(
                          ([platform]) =>
                            platform
                              .toLowerCase()
                              .includes(inputValue?.toLowerCase() || "")
                        ).length > 0 ? (
                          <IonList>
                            {Object.entries(usersFound[0].platforms)
                              .filter(([platform]) =>
                                platform
                                  .toLowerCase()
                                  .includes(inputValue?.toLowerCase() || "")
                              )
                              .map(([platform, username], index) => (
                                <IonItem
                                  key={index}
                                  className="ion-align-self-center"
                                >
                                  <Icon icon={platform as keyof Platforms} />
                                  <IonLabel>
                                    Follow on {platform}
                                    <p>{username}</p>
                                  </IonLabel>
                                  <IonButton color="tertiary">Follow</IonButton>
                                </IonItem>
                              ))}
                          </IonList>
                        ) : (
                          <>
                            <IonItem className="ion-text-center" lines="none">
                              <IonLabel>Nothing found</IonLabel>
                            </IonItem>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <IonItem className="ion-text-center" lines="none">
                          <IonLabel>No Contact Info</IonLabel>
                        </IonItem>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <IonItem className="ion-text-center" lines="none">
                      <IonLabel>Private Account</IonLabel>
                    </IonItem>
                  </>
                )}
                <SheetModal
                  trigger="open-options-modal"
                  buttons={[
                    { text: "Report" },
                    { text: "Block" },
                    {
                      text: "QR code",
                      handler: () =>
                        router.push("/share/qrcode", "forward", "push"),
                    },
                    {
                      text: "Share",
                      handler: () =>
                        router.push("/share/link", "forward", "push"),
                    },
                  ]}
                />
              </IonContent>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </IonPage>
  );
};

export default Profile;
