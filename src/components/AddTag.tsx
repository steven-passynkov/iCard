import { useState, useRef } from "react";
import {
  IonContent,
  IonToolbar,
  IonTitle,
  IonModal,
  IonHeader,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { closeOutline, checkmarkOutline, pin } from "ionicons/icons";
import ConfirmationAlert from "./ConfirmationAlert";
import SheetModal from "./SheetModal";

const AddTag: React.FC<{}> = ({}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [isConfirmationAlertOpen, setIsConfirmationAlertOpen] = useState(false);
  const [isSheetModal, setIsSheetModal] = useState(false);

  function confirm() {
    modal.current?.dismiss();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
    }
  }

  //TODO make icon selecter when click on icon

  //TODO finish this page and add confirmation if not saved

  //TODO add border radius to alert

  //TODO when in modal the modal closes then the alert closes

  return (
    <IonModal
      ref={modal}
      trigger="open-add-tag-modal"
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
          <IonTitle class="ion-text-center">Add Tag</IonTitle>
          <IonButtons slot="end">
            <IonButton shape="round" onClick={() => confirm()}>
              <IonIcon size="large" icon={checkmarkOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonButton shape="round" slot="start" fill="clear">
            <IonIcon icon={pin} style={{ fontSize: "24px" }} />
          </IonButton>
          <IonInput placeholder="Tag text" />
        </IonItem>
        <IonItem style={{ marginTop: "16px" }}>
          <IonButton shape="round" slot="start" fill="clear">
            <IonIcon icon={pin} style={{ fontSize: "24px" }} />
          </IonButton>
          <IonInput placeholder="Tag text" />
        </IonItem>
        <IonItem style={{ marginTop: "16px" }}>
          <IonButton shape="round" slot="start" fill="clear">
            <IonIcon icon={pin} style={{ fontSize: "24px" }} />
          </IonButton>
          <IonInput placeholder="Tag text" />
        </IonItem>
        <ConfirmationAlert
          isOpen={isConfirmationAlertOpen}
          onDidDismiss={() => setIsConfirmationAlertOpen(false)}
          cancelHandler={() => setIsConfirmationAlertOpen(false)}
          confirmHandler={() => modal.current?.dismiss()}
        />
        <SheetModal
          trigger="open-edit-profile-modal"
          isOpen={isSheetModal}
          onDidDismiss={() => setIsSheetModal(false)}
          buttons={[
            { text: "New profile picture" },
            { text: "Remove current picture" },
          ]}
        />
      </IonContent>
    </IonModal>
  );
};

export default AddTag;
