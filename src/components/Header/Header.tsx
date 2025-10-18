import { IonActionSheet, IonAvatar, IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import "./Header.css";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { users } from "../../data/Users";
import { useHistory } from "react-router-dom";

interface Props {
  initials: string | undefined;
}

export function Header({ initials }: Props) {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();
  const history = useHistory();

  function switchUser(newUser: typeof users[number]) {
    setUser(newUser);
    setOpen(false);
    if (newUser.availableViews.includes("request")) {
      history.replace("/employee");
    } else if (newUser.availableViews.includes("response")) {
      history.replace("/supervisor");
    } else {
      history.replace("/");
    }
  }

  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="end">
          <IonAvatar className="custom-avatar" onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
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
      <IonActionSheet
        isOpen={open}
        header="Switch user"
        onDidDismiss={() => setOpen(false)}
        buttons={[
          ...users
            .filter((u) => u.id !== user.id)
            .map((u) => ({
              text: u.name,
              handler: () => switchUser(u),
            })),
          { text: "Cancel", role: "cancel" as const },
        ]}
      />
    </IonHeader>
  );
}
