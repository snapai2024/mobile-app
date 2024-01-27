import { Redirect } from "react-router-dom";
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
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

import { PrivateGuard, PublicGuard } from "./common/router/guards";

import { LoginPage } from "./features/auth/pages/login-page";
import { HomePage } from "./features/image/pages/home-page";
import { RegisterPage } from "./features/user/pages/register-page";
import { camera, list, people } from "ionicons/icons";
import { UserPage } from "./features/user/pages/user-page";
import { CollectionListPage } from "./features/collection/pages/collection-list-page";
import { CollectionDetailPage } from "./features/collection/pages/collection-detail-page";
import {Flip, ToastContainer} from "react-toastify";
import { selectIsAuthenticated } from "./features/auth/services/auth.slice";
import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

setupIonicReact();

const App: React.FC = () => {

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet ionPage>
            <Redirect exact path="/" to="/home" />

            <PublicGuard path="/login" component={LoginPage} exact />
            <PublicGuard path="/register" component={RegisterPage} exact />

            <PrivateGuard path="/home" component={HomePage} exact />
            <PrivateGuard path="/account" component={UserPage} exact />
            <PrivateGuard
              path="/collections"
              component={CollectionListPage}
              exact
            />
            <PrivateGuard
              path="/collections/:collectionId"
              component={CollectionDetailPage}
              exact
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom" style={{ display: !isAuthenticated ? 'none' : 'flex' }}>
            <IonTabButton tab="collections" href="/collections">
              <IonIcon icon={list} />
              <IonLabel>Collections</IonLabel>
            </IonTabButton>
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={camera} />
              <IonLabel>Analyser</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
              <IonIcon icon={people} />
              <IonLabel>Compte</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      <ToastContainer
          autoClose={2000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          transition={Flip}
      />
    </IonApp>
  );
};

export default App;
