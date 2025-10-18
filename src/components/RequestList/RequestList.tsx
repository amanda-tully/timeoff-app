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
                {item.employeeName}
              </p>
            )}
            <p>
              <span className="bold-label">Start:</span> {item.startDate} <br />
              <span className="bold-label">End:</span> {item.endDate}
            </p>
            <p>
              <span className="bold-label">Status:</span>{" "}
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </p>
            {item.requestNote && (
              <p>
                <span className="bold-label">Request Note:</span>{" "}
                {item.requestNote}
              </p>
            )}
            {item.responseNote && (
              <p>
                <span className="bold-label">Response Note:</span>{" "}
                {item.responseNote}
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
