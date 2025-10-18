import { IonAvatar, IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import "./Header.css";

interface Props {
  initials: string | undefined;
}

export function Header({ initials }: Props) {
  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="end">
          <IonAvatar className="custom-avatar">
            {initials ? (
              <span className="avatar-initials">{initials}</span>
            ) : (
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            )}
          </IonAvatar>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
