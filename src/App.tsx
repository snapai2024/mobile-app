import {Redirect} from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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
import HomePage from './features/home/pages/home-page';

setupIonicReact();

const App: React.FC = () => {
  return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet ionPage>
              <Redirect exact path="/" to="/home" />
              <PrivateGuard path="/home" component={HomePage} exact />
              <PublicGuard path="/login" component={LoginPage} exact />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
  );
}

export default App;
