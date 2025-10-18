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
        <IonItem key={item.id}>
          <IonLabel className="ion-text-wrap">
            <h2>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Request
            </h2>
            {view === "response" && item.employeeName && (
              <p>
                <span className="bold-label">Employee:</span>{" "}
                <span data-testid={`employee-name-${item.id}`}>
                  {item.employeeName}
                </span>
              </p>
            )}
            <p>
              <span
                className="bold-label"
                data-testid={`start-label-${item.id}`}
              >
                Start:
              </span>{" "}
              <span data-testid={`start-value-${item.id}`}>
                {item.startDate}
              </span>{" "}
              <br />
              <span className="bold-label" data-testid={`end-label-${item.id}`}>
                End:
              </span>{" "}
              <span data-testid={`end-value-${item.id}`}>{item.endDate}</span>
            </p>
            <p>
              <span
                className="bold-label"
                data-testid={`status-label-${item.id}`}
              >
                Status:
              </span>{" "}
              <span data-testid={`status-value-${item.id}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </p>
            {item.requestNote && (
              <p>
                <span
                  className="bold-label"
                  data-testid={`request-note-label-${item.id}`}
                >
                  Request Note:
                </span>{" "}
                <span data-testid={`request-note-value-${item.id}`}>
                  {item.requestNote}
                </span>
              </p>
            )}
            {item.responseNote && (
              <p>
                <span
                  className="bold-label"
                  data-testid={`response-note-label-${item.id}`}
                >
                  Response Note:
                </span>{" "}
                <span data-testid={`response-note-value-${item.id}`}>
                  {item.responseNote}
                </span>
              </p>
            )}
            {view === "response" && handleAction && (
              <div className="action-buttons">
                <IonButton
                  id="open-modal"
                  size="small"
                  color="primary"
                  onClick={() => handleAction(item.id)}
                >
                  Process Request
                </IonButton>
              </div>
            )}
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
