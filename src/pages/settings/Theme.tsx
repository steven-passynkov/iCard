import { useContext } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonCheckbox,
} from "@ionic/react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Header from "../../components/Header";

const Theme: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <IonPage id="content">
      <Header title="Settings" />
      <IonContent class="ion-padding">
        <IonItem>
          <IonLabel>Light theme</IonLabel>
          {theme === "light" ? (
            <IonCheckbox
              slot="end"
              checked={true}
              onClick={() => toggleTheme()}
            />
          ) : (
            <IonCheckbox
              slot="end"
              checked={false}
              onClick={() => toggleTheme()}
            />
          )}
        </IonItem>
        <IonItem>
          <IonLabel>Dark theme</IonLabel>
          {theme === "dark" ? (
            <IonCheckbox
              slot="end"
              checked={true}
              onClick={() => toggleTheme()}
            />
          ) : (
            <IonCheckbox
              slot="end"
              checked={false}
              onClick={() => toggleTheme()}
            />
          )}
        </IonItem>
        {/*
        <IonItem>
          <IonLabel>System theme</IonLabel>
          {app.theme === "system" ? (
            <IonCheckbox
              slot="end"
              checked={true}
              onClick={() => toggleTheme()}
            />
          ) : (
            <IonCheckbox
              slot="end"
              checked={false}
              onClick={() => toggleTheme()}
            />
          )}
        </IonItem>
          */}
      </IonContent>
    </IonPage>
  );
};

export default Theme;
