import { IonModal, IonButton, IonSpinner } from "@ionic/react";
import { RequestListItem } from "../RequestList/RequestList";

interface Props {
  isOpen: boolean;
  onDidDismiss: () => void;
  updating: boolean;
  selectedRequest: RequestListItem | undefined;
  supervisorNote: string;
  setSupervisorNote: (note: string) => void;
  handleModalSubmit: (action: "approve" | "reject") => void;
  handleModalClose: () => void;
}

export const ProcessRequestModal: React.FC<Props> = ({
  isOpen,
  onDidDismiss,
  updating,
  selectedRequest,
  supervisorNote,
  setSupervisorNote,
  handleModalSubmit,
  handleModalClose,
}) => (
  <IonModal
    isOpen={isOpen}
    onDidDismiss={onDidDismiss}
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
      <label htmlFor="supervisor-note-input" className="supervisor-note-label">
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
);
