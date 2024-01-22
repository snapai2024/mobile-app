import {IonContent, IonPage} from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer/ExploreContainer';
import './home-page.styles';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
