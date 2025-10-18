import React from "react";
import {
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { RequestList, RequestListItem } from "../RequestList/RequestList";
import { Spinner } from "../Spinner/Spinner";

interface PendingRequestsSectionProps {
  items: RequestListItem[];
  allItems: RequestListItem[];
  loading: boolean;
  handleAction: (id: string) => void;
  onInfinite: (ev: CustomEvent<void>) => void;
}

export const PendingRequestsSection: React.FC<PendingRequestsSectionProps> = ({
  items,
  allItems,
  loading,
  handleAction,
  onInfinite,
}) => (
  <div>
    <IonItem lines="none">
      <h4>Pending Requests</h4>
    </IonItem>
    {loading ? (
      <Spinner />
    ) : (
      <>
        <RequestList
          items={items}
          view="response"
          handleAction={handleAction}
        />
        <IonInfiniteScroll
          onIonInfinite={onInfinite}
          threshold="100px"
          disabled={items.length >= allItems.length}
        >
          <IonInfiniteScrollContent loadingText="Loading more requests..." />
        </IonInfiniteScroll>
      </>
    )}
  </div>
);
