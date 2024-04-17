import { useContext } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonToggle,
} from "@ionic/react";
import { AppContext } from "../../contexts/AppContext";
import Header from "../../components/Header";

const Location: React.FC = () => {
  const { toggleLocation } = useContext(AppContext);

  return (
    <IonPage id="content">
      <Header title="Settings" />
      <IonContent class="ion-padding">
        <IonItem>
          <IonLabel>Show Location</IonLabel>
          <IonToggle onClick={() => toggleLocation()} />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Location;
