import { IonContent, IonPage } from "@ionic/react";
import ExploreContainer from "../../components/explore-container/explore-container.component";
import "./home-page.styles";

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
