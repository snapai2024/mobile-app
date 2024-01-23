import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { useGetMeQuery } from "../../services/api";
import { authenticationActions } from "../../../auth/services/auth.slice";
import { useDispatch } from "react-redux";

const UserDetail: FC = () => {
  const { data: user } = useGetMeQuery();
  const dispatch = useDispatch();

  if (!user) return;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mon compte</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form>
          <IonList inset>
            <IonItem>
              <IonInput label="Adresse email" value={user.email} disabled />
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
                label="Mot de passe"
                value="abcde12345"
                disabled
              />
            </IonItem>
          </IonList>
        </form>
        <IonButton onClick={() => dispatch(authenticationActions.logout())}>
          Se déconnecter
        </IonButton>
      </IonContent>
    </>
  );
};

export default UserDetail;
