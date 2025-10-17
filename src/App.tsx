import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import React, { useState } from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonActionSheet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { people, alarm, clipboard } from "ionicons/icons";
import EmployeePage from "./pages/EmployeePage";
import SupervisorPage from "./pages/SupervisorPage";
import { User, UserProvider, useUser } from "./context/UserContext";
import { users } from "./data/Users";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const AppInner: React.FC = () => {
  const { user, setUser } = useUser();
  const [showSheet, setShowSheet] = useState(false);
  const history = useHistory();

  const hasRequestView = user.availableViews.includes("request");
  const hasResponseView = user.availableViews.includes("response");

  const defaultPath = hasRequestView
    ? "/employee"
    : hasResponseView
      ? "/supervisor"
      : "/";

  function switchUser(newUser: User) {
    setUser(newUser);
    setShowSheet(false);
    // Redirect to the correct view immediately after switching
    if (newUser.availableViews.includes("request")) {
      history.replace("/employee");
    } else if (newUser.availableViews.includes("response")) {
      history.replace("/supervisor");
    } else {
      history.replace("/");
    }
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          {hasRequestView && (
            <Route path="/employee" render={() => <EmployeePage />} />
          )}
          {hasResponseView && (
            <Route path="/supervisor" render={() => <SupervisorPage />} />
          )}
          <Route exact path="/" render={() => <Redirect to={defaultPath} />} />
          <Route render={() => <Redirect to={defaultPath} />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        {hasRequestView && (
          <IonTabButton tab="employee" href="/employee">
            <IonIcon aria-hidden="true" icon={alarm} />
            <IonLabel>Requests</IonLabel>
          </IonTabButton>
        )}
        {hasResponseView && (
          <IonTabButton tab="supervisor" href="/supervisor">
            <IonIcon aria-hidden="true" icon={clipboard} />
            <IonLabel>Responses</IonLabel>
          </IonTabButton>
        )}

        <IonTabButton
          tab="user"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowSheet(true);
          }}
        >
          <IonIcon aria-hidden="true" icon={people} />
          <IonLabel>Switch user</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonActionSheet
        isOpen={showSheet}
        header="Switch user"
        onDidDismiss={() => setShowSheet(false)}
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
    </IonTabs>
  );
};

const App: React.FC = () => (
  <IonApp>
    <UserProvider>
      <IonReactRouter>
        <AppInner />
      </IonReactRouter>
    </UserProvider>
  </IonApp>
);

export default App;
