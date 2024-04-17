import { useState, useContext } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
  IonModal,
  IonTitle,
  IonHeader,
  IonFooter,
  IonToolbar,
  IonSearchbar,
  IonButtons,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import {
  createOutline,
  checkmarkOutline,
  addOutline,
  chevronDownOutline,
} from "ionicons/icons";
import { UserContext } from "../contexts/UserContext";
import { Platforms } from "../types/Platforms.types";
import Header from "../components/Header";
import ConfirmationAlert from "../components/ConfirmationAlert";
import LongPress from "../components/LongPress";
import Icon from "../components/Icon";

type PlatformList = {
  [key: string]: { platform: string; profileUrl: string }[];
};

const Accounts: React.FC = () => {
  const { user } = useContext(UserContext);
  const router = useIonRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isConfirmationAlertOpen, setIsConfirmationAlertOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<null | string>();
  const [platformInput, setPlatformInput] = useState<null | string>();
  const [usernameInput, setUsernameInput] = useState<null | string>();

  const platformList: PlatformList = {
    //phone: [{ platform: "Phone", profileUrl: "tel:" }],
    instagram: [
      { platform: "Instagram", profileUrl: "https://www.instagram.com/" },
    ],
    twitter: [{ platform: "Twitter", profileUrl: "https://www.twitter.com/" }],
  };

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);
    event.detail.complete();
  }

  return (
    <IonPage id="content">
      <Header
        title="Accounts"
        icon={isEdit ? checkmarkOutline : createOutline}
        secondaryIcon={isEdit ? addOutline : undefined}
        notifications={false}
        confirmation={isEdit}
        onClick={isEdit ? () => setIsEdit(false) : () => setIsEdit(true)}
        onClickConfirmation={() =>
          // TODO show confimation alert only when there are changes and if confirmed discard changes
          setIsConfirmationAlertOpen(true)
        }
        onClickSecondary={() => {
          setIsAccountOpen(true);
          setSelectedPlatform(null);
        }}
      />
      <IonContent scroll-y="true" class="ion-padding">
        {user ? (
          <>
            {isEdit ? (
              <IonReorderGroup
                disabled={false}
                onIonItemReorder={handleReorder}
              >
                {Object.keys(user.platforms).map((platform, index) => (
                  <div key={index}>
                    <LongPress
                      header={platform}
                      buttons={[
                        {
                          text: "Delete",
                          role: "role",
                          data: {
                            action: "action",
                          },
                        },
                        {
                          text: "Private",
                          role: "role",
                          data: {
                            action: "action",
                          },
                        },
                      ]}
                    >
                      <IonItem className="ion-align-self-center">
                        <Icon icon={platform as keyof Platforms} />
                        <IonLabel>
                          {platform}
                          <p>{user.platforms[platform]}</p>
                        </IonLabel>
                        <IonReorder
                          id="reorder"
                          className="ion-reorder"
                          slot="end"
                        />
                      </IonItem>
                    </LongPress>
                  </div>
                ))}
              </IonReorderGroup>
            ) : (
              <>
                {Object.keys(user.platforms).map((platform, index) => (
                  <IonItem className="ion-align-self-center" key={index}>
                    <Icon icon={platform as keyof Platforms} />
                    <IonLabel>
                      {platform}
                      <p>{user.platforms[platform]}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </>
            )}
          </>
        ) : (
          <></>
        )}
        <ConfirmationAlert
          isOpen={isConfirmationAlertOpen}
          onDidDismiss={() => setIsConfirmationAlertOpen(false)}
          cancelHandler={() => setIsConfirmationAlertOpen(false)}
          confirmHandler={() => router.goBack()}
        />
        <IonModal
          isOpen={isAccountOpen}
          onIonModalDidDismiss={() => (
            setIsAccountOpen(false), setPlatformInput(null)
          )}
        >
          {selectedPlatform === null ? (
            <>
              <IonHeader className="ion-no-border">
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton
                      onClick={() => setIsAccountOpen(false)}
                      style={{
                        marginInlineStart: "4px",
                      }}
                    >
                      <IonIcon icon={chevronDownOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Select Account</IonTitle>
                </IonToolbar>
                <IonToolbar>
                  <IonSearchbar
                    color="light"
                    onIonChange={(event) =>
                      setPlatformInput(event.detail.value)
                    }
                  ></IonSearchbar>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                {Object.keys(platformList)
                  .map((key) => platformList[key][0].platform)
                  .filter((el) =>
                    el.toLowerCase().includes(platformInput || "".toLowerCase())
                  )
                  .map((contact, index) => (
                    <IonItem
                      key={index}
                      onClick={() => setSelectedPlatform(contact)}
                    >
                      <Icon icon={contact as keyof Platforms} />
                      {contact}
                    </IonItem>
                  ))}
              </IonContent>
            </>
          ) : (
            <>
              <IonHeader className="ion-no-border">
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton
                      onClick={() => setIsAccountOpen(false)}
                      style={{
                        marginInlineStart: "4px",
                      }}
                    >
                      <IonIcon icon={chevronDownOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Select Account</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                {/* TODO make a simple input form so you dont need to add apis */}
                <IonItem>
                  <IonInput
                    placeholder="Username"
                    onIonChange={(event) =>
                      setUsernameInput(event.detail.value)
                    }
                  />
                </IonItem>
                <IonItem lines="none" className="ion-text-center">
                  <IonLabel>
                    <IonButton
                      color="tertiary"
                      expand="block"
                      disabled={
                        usernameInput === undefined || usernameInput === ""
                          ? true
                          : false
                      }
                      //href={`${platformInput[selectedPlatform]}${usernameInput}`}
                    >
                      View
                    </IonButton>
                  </IonLabel>
                </IonItem>
              </IonContent>
              <IonFooter>
                <IonToolbar>
                  <IonItem lines="none" className="ion-text-center">
                    <IonLabel>
                      <IonButton
                        expand="block"
                        onClick={() => setSelectedPlatform(null)}
                      >
                        Cancel
                      </IonButton>
                    </IonLabel>
                    <IonLabel>
                      <IonButton
                        expand="block"
                        disabled={
                          usernameInput === undefined || usernameInput === ""
                            ? true
                            : false
                        }
                      >
                        Submit
                      </IonButton>
                    </IonLabel>
                  </IonItem>
                </IonToolbar>
              </IonFooter>
            </>
          )}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Accounts;
