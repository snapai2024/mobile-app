import {Redirect} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

import {PrivateGuard, PublicGuard} from "./common/router/guards";

import LoginPage from "./features/auth/pages/login-page";
import HomePage from './features/image/pages/home-page';
import RegisterPage from "./features/user/pages/register-page";
import {camera, list, people} from "ionicons/icons";
import UserPage from './features/user/pages/user-page/user-page.component';

setupIonicReact();

const App: React.FC = () => {
  return (
      <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet ionPage>
                    <Redirect exact path="/" to="/home" />
                    <PrivateGuard path="/home" component={HomePage} exact />
                    <PublicGuard path="/login" component={LoginPage} exact />
                    <PrivateGuard path="/account" component={UserPage} exact />
                    <PublicGuard path="/register" component={RegisterPage} exact />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="collections" href="/collections">
                        <IonIcon icon={list} />
                        <IonLabel>Collections</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="home" href="/home">
                        <IonIcon icon={camera} />
                        <IonLabel>Analyse</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="account" href="/account">
                        <IonIcon icon={people} />
                        <IonLabel>Account</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
      </IonApp>
  );
}

export default App;
