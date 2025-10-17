import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useUser } from "../context/UserContext";

const SupervisorPage: React.FC = () => {
  const { user } = useUser();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Team Requests</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>SupervisorPage</IonContent>
    </IonPage>
  );
};

export default SupervisorPage;
