import { IonItem, IonLabel, IonModal } from "@ionic/react";

const SheetModal: React.FC<{
  trigger?: string;
  isOpen?: boolean;
  onDidDismiss?: any;
  header?: string;
  subHeader?: string;
  image?: string;
  buttons: Array<{ text?: string; handler?: any }>;
}> = ({
  trigger,
  isOpen,
  onDidDismiss,
  header,
  subHeader,
  image,
  buttons,
}) => {
  return (
    <IonModal
      trigger={trigger}
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      id="auto-height-sheet"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <div className="ion-padding-top ion-padding-bottom">
        {header || subHeader || image ? (
          <IonItem>
            <IonLabel style={{ fontSize: "17px", fontWeight: 500 }}>
              {subHeader ? <p>{subHeader}</p> : <></>}
              {header ? <> {header}</> : <></>}
              {image ? (
                <img src={image} height="150 px" width="150 px" />
              ) : (
                <></>
              )}
            </IonLabel>
          </IonItem>
        ) : (
          <></>
        )}
        {buttons.map((button, index) => (
          <IonItem
            lines={index === buttons.length - 1 ? "none" : "full"}
            button
            onClick={button.handler ? button.handler : undefined}
            key={index}
          >
            {button.text}
          </IonItem>
        ))}
      </div>
    </IonModal>
  );
};

export default SheetModal;
