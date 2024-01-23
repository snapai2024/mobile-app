import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { usePostUserMutation } from "../../services/api";
import { UserFormData, UserRequest } from "../../models/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const RegisterForm: FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();
  const [userPost, { isSuccess }] = usePostUserMutation();
  const history = useHistory();

  useEffect(() => {
    if (isSuccess) {
      history.push("/login");
      toast.success("Vous vous êtes inscrit.");
    }
  }, [isSuccess]);

  const onSubmit = async (d: UserFormData) => {
    const { email, password } = d;

    const data: UserRequest = {
      email,
      password,
      roleId: 1,
    };

    userPost(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonList inset>
        <IonItem>
          <IonInput
            label="Adresse email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <IonText color="danger">L'adresse email est requise.</IonText>
          )}
        </IonItem>
        <IonItem>
          <IonInput
            type="password"
            label="Mot de passe"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <IonText color="danger">Le mot de passe est requis.</IonText>
          )}
        </IonItem>
        <IonItem>
          <IonInput
            type="password"
            label="Répétez mot de passe"
            {...register("repeatPassword", { required: true })}
          />
          {errors.repeatPassword && (
            <IonText color="danger">
              Les mots de passe ne correspondent pas.
            </IonText>
          )}
        </IonItem>
        <IonButton className="ion-margin-top" type="submit" expand="block">
          Inscription
        </IonButton>
        <IonItem>
          <IonText>
            {" "}
            Déjà un compte ?{" "}
            <IonRouterLink href="/login">Se connecter</IonRouterLink>
          </IonText>
        </IonItem>
      </IonList>
    </form>
  );
};

export default RegisterForm;
