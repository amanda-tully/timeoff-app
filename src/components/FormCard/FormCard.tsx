import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonLabel,
  IonItem,
  IonModal,
  IonDatetime,
  IonDatetimeButton,
  IonSpinner,
} from "@ionic/react";

import "./FormCard.css";

interface Props {
  title: string;
  submitting?: boolean;
  onSubmit: (values: {
    startDate: string;
    endDate: string;
    type: string;
    note?: string;
  }) => void;
}

export function FormCard({ title, submitting = false, onSubmit }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);
  const [type, setType] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{
    startDate?: string;
    endDate?: string;
    type?: string;
  }>({});

  function validate() {
    const newErrors: { startDate?: string; endDate?: string; type?: string } =
      {};
    if (!startDate) newErrors.startDate = "Start date is required.";
    if (!endDate) newErrors.endDate = "End date is required.";
    if (!type) newErrors.type = "Type is required.";
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit({
      startDate: startDate,
      endDate: endDate,
      type,
      note,
    });

    setStartDate(today);
    setEndDate(today);
    setType("");
    setNote("");
    setErrors({});
  }

  const isFormValid = startDate && endDate && type;

  return (
    <IonCard className="form-card">
      <IonCardHeader>
        <div className="header-row">
          <IonCardTitle>{title}</IonCardTitle>
        </div>
      </IonCardHeader>

      <IonCardContent>
        <form onSubmit={handleSubmit} className="form" role="form">
          <IonItem className="form-item">
            <IonLabel position="stacked">Start Date *</IonLabel>
            <IonDatetimeButton
              datetime="start-date-picker"
              className="date-left-align"
              disabled={submitting}
            />
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                data-testid="start-date"
                id="start-date-picker"
                presentation="date"
                min={today}
                value={startDate}
                onIonChange={(e) => {
                  const val = e.detail.value as string;
                  setStartDate(val);
                  setErrors((prev) => ({ ...prev, startDate: undefined }));
                }}
              />
            </IonModal>
            {errors.startDate && (
              <div
                className="form-error"
                style={{ color: "red", fontSize: "0.9em" }}
              >
                {errors.startDate}
              </div>
            )}
          </IonItem>

          <IonItem className="form-item">
            <IonLabel position="stacked">End Date *</IonLabel>
            <IonDatetimeButton
              datetime="end-date-picker"
              className="date-left-align"
              disabled={submitting}
            />
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="end-date-picker"
                data-testid="end-date"
                presentation="date"
                min={startDate}
                value={endDate}
                onIonChange={(e) => {
                  const val = e.detail.value as string;
                  setEndDate(val);
                  setErrors((prev) => ({ ...prev, endDate: undefined }));
                }}
              />
            </IonModal>
            {errors.endDate && (
              <div
                className="form-error"
                style={{ color: "red", fontSize: "0.9em" }}
              >
                {errors.endDate}
              </div>
            )}
          </IonItem>

          <IonItem className="form-item">
            <IonLabel position="stacked">Type *</IonLabel>
            <IonSelect
              data-testid="type-select"
              value={type}
              placeholder="Select type"
              onIonChange={(e) => {
                setType(e.detail.value);
                setErrors((prev) => ({ ...prev, type: undefined }));
              }}
              disabled={submitting}
            >
              <IonSelectOption value="Vacation">Vacation</IonSelectOption>
              <IonSelectOption value="Sick day">Sick day</IonSelectOption>
              <IonSelectOption value="Personal">Personal</IonSelectOption>
            </IonSelect>
            {errors.type && (
              <div
                className="form-error"
                style={{ color: "red", fontSize: "0.9em" }}
              >
                {errors.type}
              </div>
            )}
          </IonItem>

          <IonItem className="form-item">
            <IonLabel position="stacked">Note</IonLabel>
            <IonTextarea
              value={note}
              onIonChange={(e) => setNote(e.detail.value!)}
              placeholder="Reason for request..."
              rows={4}
              disabled={submitting}
            />
          </IonItem>

          <IonButtons className="form-actions">
            <IonButton
              expand="block"
              color="primary"
              type="submit"
              disabled={!isFormValid || submitting}
              role="button"
            >
              {submitting ? <IonSpinner name="dots" /> : "Submit"}
            </IonButton>
          </IonButtons>
        </form>
      </IonCardContent>
    </IonCard>
  );
}
