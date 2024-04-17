import { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonToolbar,
  IonTitle,
  IonModal,
  IonHeader,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonAvatar,
  IonIcon,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { closeOutline, checkmarkOutline } from "ionicons/icons";
import ConfirmationAlert from "./ConfirmationAlert";
import SheetModal from "./SheetModal";

const EditProfile: React.FC<{ name: string; username: string }> = ({
  name,
  username,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [isConfirmationAlertOpen, setIsConfirmationAlertOpen] = useState(false);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [inputName, setInputName] = useState<string | null | undefined>();
  const [inputUsername, setInputUsername] = useState<
    string | null | undefined
  >();

  useEffect(() => {
    setInputName(name);
    setInputUsername(username);
  }, [name, username]);

  function confirm() {
    modal.current?.dismiss();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
    }
  }

  //have @ in front of username at all times

  //TODO finish this page and add confirmation if not saved

  return (
    <IonModal
      ref={modal}
      trigger="open-edit-profile-modal"
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              shape="round"
              onClick={() => setIsConfirmationAlertOpen(true)}
            >
              <IonIcon size="large" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle class="ion-text-center">Edit Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton shape="round" onClick={() => confirm()}>
              <IonIcon size="large" icon={checkmarkOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem lines="none">
          <IonAvatar
            id="open-edit-profile-picture-modal"
            style={{ margin: "auto" }}
          >
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
        </IonItem>
        <IonItem lines="none" class="ion-text-center">
          <IonLabel>
            <IonButton
              size="small"
              fill="clear"
              onClick={() => setIsSheetModalOpen(true)}
              style={{ "--ripple-color": "transparent" }}
            >
              <u>Edit profile picture</u>
            </IonButton>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Enter your name</IonLabel>
          <IonInput
            type="text"
            placeholder="Your name"
            value={inputName}
            onIonChange={(event) => setInputName(event.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Enter your name</IonLabel>
          <IonInput
            type="text"
            placeholder="Your name"
            value={inputUsername}
            onIonChange={(event) => setInputUsername(event.detail.value)}
          />
        </IonItem>
        <ConfirmationAlert
          isOpen={isConfirmationAlertOpen}
          onDidDismiss={() => setIsConfirmationAlertOpen(false)}
          cancelHandler={() => setIsConfirmationAlertOpen(false)}
          confirmHandler={() => modal.current?.dismiss()}
        />
        <SheetModal
          trigger="open-edit-profile-picture-modal"
          isOpen={isSheetModalOpen}
          onDidDismiss={() => setIsSheetModalOpen(false)}
          buttons={[
            { text: "New profile picture" },
            { text: "Remove current picture" },
          ]}
        />
      </IonContent>
    </IonModal>
  );
};

export default EditProfile;
