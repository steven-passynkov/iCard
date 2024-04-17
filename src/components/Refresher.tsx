import { useContext } from "react";
import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import { AppContext } from "../contexts/AppContext";

export const Refresher: React.FC<{ onRefresh: Function }> = ({ onRefresh }) => {
  const { networkStatus } = useContext(AppContext);

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    if (networkStatus) {
      if (networkStatus.connected === true) {
        setTimeout(() => {
          onRefresh();
          event.detail.complete();
        }, 2000);
      } else {
        event.detail.complete();
      }
    }
  }

  return (
    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
  );
};

export default Refresher;
