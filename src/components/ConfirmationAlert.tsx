import React from "react";
import { IonAlert } from "@ionic/react";

const ConfirmationAlert: React.FC<{
  isOpen: boolean;
  onDidDismiss: () => void;
  cancelHandler: () => void;
  confirmHandler: () => void;
}> = ({ isOpen, onDidDismiss ,cancelHandler, confirmHandler }) => {

    //TODO when in modal the modal closes then the alert closes
    //TODO add border radius to alert

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      header="Are you sure you want to discard your changes?"
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: cancelHandler,
        },
        {
          text: "Confirm",
          role: "confirm",
          handler: confirmHandler,
        },
      ]}
      //style={{ borderRadius: "20px" }}
    />
  );
};

export default ConfirmationAlert;
