import { IonPage } from "@ionic/react";
import { FC } from "react";
import { UserDetail } from "../../components/user-detail";

const UserPage: FC = () => {
  return (
    <IonPage>
      <UserDetail />
    </IonPage>
  );
};

export default UserPage;
