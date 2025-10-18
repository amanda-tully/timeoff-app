import { IonSpinner } from "@ionic/react";

interface Props {
  name?:
    | "bubbles"
    | "circles"
    | "circular"
    | "crescent"
    | "dots"
    | "lines"
    | "lines-small"
    | "lines-sharp"
    | "lines-sharp-small"
    | undefined;
}

export function Spinner({ name = "crescent" }: Props) {
  return (
    <div className="spinner-container">
      <IonSpinner name={name} />
    </div>
  );
}
