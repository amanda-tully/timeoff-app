import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonChip,
  IonIcon,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";

import "./RequestCard.css";

export function RequestCard() {
  return (
    <IonCard className="request-card">
      <IonCardHeader>
        <div className="header-row">
          <IonCardTitle></IonCardTitle>
          <IonChip></IonChip>
        </div>
        <IonCardSubtitle></IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="actions">
          <IonButtons>
            <IonButton color="medium">
              <IonIcon slot="start" icon={closeCircle} /> Cancel
            </IonButton>
          </IonButtons>
        </div>
      </IonCardContent>
    </IonCard>
  );
}
