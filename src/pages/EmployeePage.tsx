import { IonContent, IonItem, IonPage } from "@ionic/react";
import { useUser } from "../context/UserContext";
import { FormCard } from "../components/FormCard/FormCard";
import { RequestList } from "../components/RequestList/RequestList";
import { useEmployeeRequests } from "../hooks/useTimeOffRequests";
import { Header } from "../components/Header/Header";
import { useState } from "react";
// import { Pagination } from "../components/Pagination/Pagination";

const PAGE_SIZE = 2;

const EmployeePage: React.FC = () => {
  const { user } = useUser();
  const { requests, create } = useEmployeeRequests(user.id, user.name);
  const [currentPage, setCurrentPage] = useState(1);

  const items = requests.map((r) => ({
    id: r.id,
    startDate: r.startDate,
    endDate: r.endDate,
    type: r.type,
    status: r.status,
    requestNote: r.note,
    responseNote: r.supervisorNote,
  }));

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const pagedItems = items.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <IonPage>
      <Header initials={user?.name?.[0]} />
      <IonContent fullscreen>
        <FormCard
          onSubmit={(values) =>
            create({
              startDate: values.startDate,
              endDate: values.endDate,
              type: values.type,
              note: values.note,
            })
          }
          title="New Request"
        />
        <IonItem>
          <h3>Request History</h3>
        </IonItem>
        <RequestList items={pagedItems} view="requests" />
        {/*<Pagination*/}
        {/*  currentPage={currentPage}*/}
        {/*  totalPages={totalPages}*/}
        {/*  onPageChange={setCurrentPage}*/}
        {/*/>*/}
      </IonContent>
    </IonPage>
  );
};

export default EmployeePage;
