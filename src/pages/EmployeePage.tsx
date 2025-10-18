import { IonContent, IonItem, IonPage, IonSpinner } from "@ionic/react";
import { useUser } from "../context/UserContext";
import { FormCard } from "../components/FormCard/FormCard";
import { RequestList } from "../components/RequestList/RequestList";
import { useEmployeeRequests } from "../hooks/useTimeOffRequests";
import { Header } from "../components/Header/Header";
import { useState } from "react";
import { Pagination } from "../components/Pagination/Pagination";
import { Spinner } from "../components/Spinner/Spinner";

const PAGE_SIZE = 3;

const EmployeePage: React.FC = () => {
  const { user } = useUser();
  const { requests, loading, creating, create } = useEmployeeRequests(
    user.id,
    user.name,
  );
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
          submitting={creating}
        />
        <IonItem>
          <h3>History</h3>
        </IonItem>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <RequestList items={pagedItems} view="requests" />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EmployeePage;
