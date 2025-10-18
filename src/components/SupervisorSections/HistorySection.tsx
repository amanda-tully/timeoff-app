import React from "react";
import { IonItem } from "@ionic/react";
import { RequestList, RequestListItem } from "../RequestList/RequestList";
import { Spinner } from "../Spinner/Spinner";

interface HistorySectionProps {
  items: RequestListItem[];
  loading: boolean;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  items,
  loading,
}) => (
  <div>
    <IonItem lines="none">
      <h4>History</h4>
    </IonItem>
    {loading ? <Spinner /> : <RequestList items={items} view="response" />}
  </div>
);
