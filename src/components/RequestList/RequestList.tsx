import { IonList, IonItem, IonLabel, IonButton } from "@ionic/react";
import { TimeOffStatus, TimeOffType } from "../../api/timeoff";
import "./RequestList.css";

export type ResponseType = "pending" | "approved" | "rejected";

export interface RequestListItem {
  id: string;
  employeeName?: string;
  startDate: string;
  endDate: string;
  type: TimeOffType;
  status: TimeOffStatus;
  requestNote?: string;
  responseNote?: string;
}

interface Props {
  items: RequestListItem[];
  view: "requests" | "response";
  handleAction?: (id: string) => void;
}

export function RequestList({ items, view, handleAction }: Props) {
  if (items.length === 0) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>No requests</IonLabel>
        </IonItem>
      </IonList>
    );
  }
  return (
    <IonList>
      {items.map((item) => (
        <IonItem key={item.id} className="request-list-item">
          <div className="request-list-item-content">
            <div className="request-list-item-header">
              <span className="request-type">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Request
              </span>
              <span
                className={`status-indicator status-${item.status}`}
                data-testid={`status-indicator-${item.id}`}
              ></span>
            </div>
            {view === "response" && (
              <div className="request-employee-row">
                <span className="request-label">Employee:</span>
                <span
                  className="request-employee"
                  data-testid={`employee-name-${item.id}`}
                >
                  {item.employeeName || "Unknown"}
                </span>
              </div>
            )}
            <div className="request-dates-row">
              <span className="request-label">Date:</span>
              <span
                className="request-value"
                data-testid={`date-value-${item.id}`}
              >
                {item.startDate} - {item.endDate}
              </span>
            </div>
            <div className="request-status-row">
              <span
                className="request-label"
                data-testid={`status-label-${item.id}`}
              >
                Status:
              </span>
              <span
                className="request-value"
                data-testid={`status-value-${item.id}`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
            {item.requestNote && (
              <div className="request-note-row">
                <span
                  className="request-label"
                  data-testid={`request-note-label-${item.id}`}
                >
                  Request Note:
                </span>
                <span
                  className="request-value"
                  data-testid={`request-note-value-${item.id}`}
                >
                  {item.requestNote}
                </span>
              </div>
            )}
            {item.responseNote && (
              <div className="response-note-row">
                <span
                  className="request-label"
                  data-testid={`response-note-label-${item.id}`}
                >
                  Response Note:
                </span>
                <span
                  className="request-value"
                  data-testid={`response-note-value-${item.id}`}
                >
                  {item.responseNote}
                </span>
              </div>
            )}
            {view === "response" && handleAction && (
              <div className="action-buttons">
                <IonButton
                  id="open-modal"
                  size="small"
                  color="primary"
                  data-testid="process-request-btn"
                  onClick={() => handleAction(item.id)}
                >
                  Process Request
                </IonButton>
              </div>
            )}
          </div>
        </IonItem>
      ))}
    </IonList>
  );
}
