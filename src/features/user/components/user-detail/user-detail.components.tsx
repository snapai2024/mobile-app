import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { useGetMeQuery, usePatchUserMutation } from "../../services/api";
import { authenticationActions } from "../../../auth/services/auth.slice";
import { useDispatch } from "react-redux";
import { UserFormData, UserRequest } from "../../models/user";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { logOut } from "ionicons/icons";

const UserDetail: FC = () => {
  const { data: user } = useGetMeQuery();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [patchUser, { isSuccess }] = usePatchUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Modifications enregistrées.')
      setIsEditing(false);
    }
  }, [isSuccess])

  const onSubmit = (d: UserFormData) => {
    const { email, password } = d;

    const data: UserRequest = {
      email: d.email || undefined,
      password: d.password || undefined,
    };

    patchUser({ id: user?.id, ...data});
  }

  if (!user) return;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mon compte</IonTitle>
          <IonButtons slot="end">
              <IonButton strong={true} onClick={() => setIsEditing(!isEditing)}>
                {!isEditing ? "Modifier" : 'Annuler'}
              </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList inset style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <IonItem lines="none">
              <IonInput 
              label="Adresse email" 
              value={user.email} 
              disabled={!isEditing} 
              {...register('email', { disabled: !isEditing })}
              />
            </IonItem>
            <IonItem lines="none">
              <IonInput
                type="password"
                label="Mot de passe"
                value={!isEditing ? "abcde12345" : ""}
                disabled={!isEditing}
                {...register('password', { disabled: !isEditing })}
              />
            </IonItem>
            {
              isEditing && (
                <IonButton size="small" type="submit" className="ion-margin">
                  Enregistrer
                </IonButton>
              )
            }
          </IonList>
        </form>
        <IonButton color="dark" style={{ width: '70%', position: 'fixed', bottom: '10px', left: 0, right: 0, margin: '0 auto' }} onClick={() => dispatch(authenticationActions.logout())}>
          <IonIcon slot="start" icon={logOut}></IonIcon>
          Se déconnecter
        </IonButton>
      </IonContent>
    </>
  );
};

export default UserDetail;
