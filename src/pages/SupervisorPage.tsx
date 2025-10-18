import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useSupervisorRequests } from "../hooks/useTimeOffRequests";
import { Header } from "../components/Header/Header";
import { Pagination } from "../components/Pagination/Pagination";

import "./SupervisorPage.css";
import { ProcessRequestModal } from "../components/SupervisorSections/ProcessRequestModal";
import { HistorySection } from "../components/SupervisorSections/HistorySection";
import { PendingRequestsSection } from "../components/SupervisorSections/PendingRequestsSection";

const PAGE_SIZE = 3;
const PENDING_PAGE_SIZE = 8;

const SupervisorPage: React.FC = () => {
  const { user } = useUser();
  const { requests, loading, updating, approve, reject } =
    useSupervisorRequests(user.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingPage, setPendingPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<
    string | number | null
  >(null);
  const [supervisorNote, setSupervisorNote] = useState("");

  const items = requests.map((r) => ({
    id: r.id,
    employeeName: r.employeeName,
    startDate: r.startDate,
    endDate: r.endDate,
    type: r.type,
    status: r.status,
    requestNote: r.note,
    responseNote: r.supervisorNote,
  }));

  const toProcessItems = items.filter((item) => item.status === "pending");
  const pagedPendingItems = toProcessItems.slice(
    0,
    pendingPage * PENDING_PAGE_SIZE,
  );
  const historyItems = items.filter((item) => item.status !== "pending");
  const totalPages = Math.max(1, Math.ceil(historyItems.length / PAGE_SIZE));
  const pagedItems = historyItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const selectedRequest = items.find((item) => item.id === selectedRequestId);

  async function handleModalSubmit(action: "approve" | "reject") {
    if (!selectedRequestId) return;
    if (action === "approve") {
      await approve(String(selectedRequestId), supervisorNote);
    } else {
      await reject(String(selectedRequestId), supervisorNote);
    }
    setModalOpen(false);
    setSelectedRequestId(null);
    setSupervisorNote("");
  }

  function handleAction(id: string) {
    setSelectedRequestId(id);
    setSupervisorNote("");
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
    setSelectedRequestId(null);
    setSupervisorNote("");
  }

  return (
    <IonPage>
      <Header initials={user?.name?.[0]} />
      <IonContent fullscreen>
        <PendingRequestsSection
          items={pagedPendingItems}
          allItems={toProcessItems}
          loading={loading}
          handleAction={handleAction}
          onInfinite={(ev) => {
            setPendingPage((prev) => prev + 1);
            (ev.target as HTMLIonInfiniteScrollElement).complete();
          }}
        />
        <HistorySection items={pagedItems} loading={loading} />
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <ProcessRequestModal
          isOpen={modalOpen}
          onDidDismiss={handleModalClose}
          updating={updating}
          selectedRequest={selectedRequest}
          supervisorNote={supervisorNote}
          setSupervisorNote={setSupervisorNote}
          handleModalSubmit={handleModalSubmit}
          handleModalClose={handleModalClose}
        />
      </IonContent>
    </IonPage>
  );
};

export default SupervisorPage;
