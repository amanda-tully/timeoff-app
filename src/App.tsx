import { Route, Redirect, Switch } from "react-router-dom";
import React from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { alarm, clipboard } from "ionicons/icons";
import EmployeePage from "./pages/EmployeePage";
import SupervisorPage from "./pages/SupervisorPage";
import { UserProvider, useUser } from "./context/UserContext";

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
  const { user } = useUser();

  const hasRequestView = user.availableViews.includes("request");
  const hasResponseView = user.availableViews.includes("response");

  const defaultPath = hasRequestView
    ? "/employee"
    : hasResponseView
      ? "/supervisor"
      : "/";

  return (
    <IonTabs key={user.id}>
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
      </IonTabBar>
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
