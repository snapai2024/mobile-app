import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from './features/home/pages/HomePage';
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
import {useAuthentication} from "./common/hooks/use-authentication";

setupIonicReact();

const App: React.FC = () => {
  const { isAuthenticated } = useAuthentication();

  console.log(isAuthenticated());

  return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route
                exact
                path="/protected-home"
                render={(props) => {
                    return isAuthenticated() ? <HomePage /> : null
                }}
            />
              <Route
                  exact
                  path="/public-home"
                  render={(props) => {
                      return <HomePage/>
                  }}
              />
            <Route exact path="/">
              <Redirect to="/public-home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
  );
}

export default App;
