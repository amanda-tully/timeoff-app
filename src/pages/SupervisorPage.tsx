import {
  IonContent,
  IonItem,
  IonPage,
  IonModal,
  IonButton,
  IonSpinner,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { RequestList } from "../components/RequestList/RequestList";
import { useSupervisorRequests } from "../hooks/useTimeOffRequests";
import { Header } from "../components/Header/Header";
import { Pagination } from "../components/Pagination/Pagination";

import "./SupervisorPage.css";
import { Spinner } from "../components/Spinner/Spinner"; // <-- Import the CSS here

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
        <div>
          <IonItem lines="none">
            <h4>Pending Requests</h4>
          </IonItem>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <RequestList
                items={pagedPendingItems}
                view="response"
                handleAction={handleAction}
              />
              <IonInfiniteScroll
                onIonInfinite={(ev) => {
                  setPendingPage((prev) => prev + 1);
                  ev.target.complete();
                }}
                threshold="100px"
                disabled={pagedPendingItems.length >= toProcessItems.length}
              >
                <IonInfiniteScrollContent loadingText="Loading more requests..." />
              </IonInfiniteScroll>
            </>
          )}
        </div>
        <div>
          <IonItem lines="none">
            <h4>History</h4>
          </IonItem>
          {loading ? (
            <Spinner />
          ) : (
            <RequestList items={pagedItems} view="requests" />
          )}
        </div>
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <IonModal
          isOpen={modalOpen}
          onDidDismiss={handleModalClose}
          className="custom-modal"
        >
          <div className="modal-content">
            <h2>Process Request</h2>

            {selectedRequest && (
              <div className="modal-details">
                <p>
                  <strong>Employee:</strong> {selectedRequest.employeeName}
                </p>
                <p>
                  <strong>Type:</strong> {selectedRequest.type}
                </p>
                <p>
                  <strong>Start:</strong> {selectedRequest.startDate}
                </p>
                <p>
                  <strong>End:</strong> {selectedRequest.endDate}
                </p>
                <p>
                  <strong>Note:</strong> {selectedRequest.requestNote}
                </p>
              </div>
            )}

            <label
              htmlFor="supervisor-note-input"
              className="supervisor-note-label"
            >
              Supervisor Note
            </label>
            <textarea
              id="supervisor-note-input"
              className="supervisor-note-input"
              value={supervisorNote}
              onChange={(e) => setSupervisorNote(e.target.value)}
              placeholder="Add a note (optional)"
            />

            <div className="modal-actions">
              <IonButton
                color="dark"
                fill="outline"
                onClick={handleModalClose}
                disabled={updating}
              >
                Cancel
              </IonButton>
              <IonButton
                color="danger"
                fill="outline"
                onClick={() => handleModalSubmit("reject")}
                disabled={updating}
              >
                {updating ? <IonSpinner name="dots" /> : "Reject"}
              </IonButton>
              <IonButton
                onClick={() => handleModalSubmit("approve")}
                disabled={updating}
              >
                {updating ? <IonSpinner name="dots" /> : "Approve"}
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default SupervisorPage;
