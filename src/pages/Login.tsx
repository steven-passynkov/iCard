import { useContext } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { AuthContext } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const router = useIonRouter();

  return (
    <IonPage id="content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>iCard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonList lines="none">
          <IonItem>
            <IonInput placeholder="Username" />
          </IonItem>
          <IonItem>
            <IonInput type="password" placeholder="Password" />
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonButton expand="block" onClick={() => login()}>
                Log In
              </IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonTitle style={{ paddingLeft: 0, paddingRight: 0 }}>
            Don't have an account?{" "}
            <a onClick={() => router.push("/signup", "forward", "push")}>
              Sign Up
            </a>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
