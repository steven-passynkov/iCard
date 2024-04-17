import { useContext } from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import { Share } from "@capacitor/share";
import { UserContext } from "../../contexts/UserContext";
import Header from "../../components/Header";

const Link: React.FC = () => {
  const user = useContext(UserContext);

  //connect to database to get the title, text, url and dialogTitle

  const share = async () => {
    await Share.share({
      title: "See cool stuff",
      text: "Really awesome thing you need to see right meow",
      url: "http://ionicframework.com/",
      dialogTitle: "Share with buddies",
    });
  };

  return (
    <IonPage id="content">
      <Header title="Share" />
      <IonContent class="ion-padding">
        <IonButton onClick={() => share()}>Share</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Link;
