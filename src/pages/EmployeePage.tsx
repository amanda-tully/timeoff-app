import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useUser } from "../context/UserContext";
import { FormCard } from "../components/FormCard/FormCard";

const EmployeePage: React.FC = () => {
  const { user } = useUser();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{user.name} My Requests</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>EmployeePage</h1>
        <FormCard onSubmit={() => console.log("submit")} title="New Request" />
      </IonContent>
    </IonPage>
  );
};

export default EmployeePage;
