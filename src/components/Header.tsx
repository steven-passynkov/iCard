import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonBackButton,
  IonIcon,
} from "@ionic/react";
import HeaderMenu from "./HeaderMenu";
import { arrowBackSharp } from "ionicons/icons";

export const Header: React.FC<{
  title?: string;
  icon?: string;
  secondaryIcon?: string;
  notifications?: boolean;
  confirmation?: boolean;
  id?: string;
  onClick?: () => void;
  onClickTitle?: () => void;
  onClickConfirmation?: () => void;
  onClickSecondary?: () => void;
}> = ({
  title,
  icon,
  secondaryIcon,
  notifications,
  confirmation,
  id,
  onClick,
  onClickTitle,
  onClickConfirmation,
  onClickSecondary,
}) => {
  return (
    <>
      {icon ? (
        <>
          {notifications === false ? (
            <IonHeader className="ion-no-border">
              <IonToolbar>
                {confirmation ? (
                  <IonButtons
                    slot="start"
                    onClick={onClickConfirmation}
                    style={{
                      paddingInlineStart: "12px",
                      paddingInlineEnd: "12px",
                    }}
                  >
                    <IonIcon
                      icon={arrowBackSharp}
                      style={{ fontSize: "24px" }}
                    />
                  </IonButtons>
                ) : (
                  <IonButtons slot="start">
                    <IonBackButton default-href="/"></IonBackButton>
                  </IonButtons>
                )}
                <IonTitle>{title}</IonTitle>
                <>
                  {secondaryIcon ? (
                    <IonButtons slot="end">
                      <IonButton
                        id={id}
                        shape="round"
                        onClick={onClickSecondary}
                      >
                        <IonIcon size="large" icon={secondaryIcon} />
                      </IonButton>
                    </IonButtons>
                  ) : (
                    <></>
                  )}
                </>
                <IonButtons slot="end">
                  <IonButton id={id} shape="round" onClick={onClick}>
                    <IonIcon size="large" icon={icon} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
          ) : (
            <>
              <IonHeader className="ion-no-border">
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                  </IonButtons>
                  <IonTitle>iCard</IonTitle>
                  <IonButtons slot="end">
                    <IonButton
                      routerLink="/notifications"
                      routerDirection="forward"
                    >
                      <IonIcon size="large" icon={icon} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <HeaderMenu />
            </>
          )}
        </>
      ) : (
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton default-href="/"></IonBackButton>
            </IonButtons>
            <div onClick={onClickTitle}>
              <IonTitle>{title}</IonTitle>
            </div>
          </IonToolbar>
        </IonHeader>
      )}
    </>
  );
};

export default Header;
