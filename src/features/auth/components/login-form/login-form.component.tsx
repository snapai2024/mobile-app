import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { LoginFormData, LoginRequest } from "../../models/auth";
import { useLoginMutation } from "../../services/api";

const LoginForm: FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [loginPost] = useLoginMutation();

  const onSubmit = async (d: LoginFormData) => {
    const { email, password } = d;

    const data: LoginRequest = {
      data: {
        email,
        password,
      },
    };

    loginPost(data);
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
        <IonButton className="ion-margin-top" type="submit" expand="block">
          Connexion
        </IonButton>
        <IonItem>
          <IonText>
            {" "}
            Pas de compte ?{" "}
            <IonRouterLink href="/register">S'inscrire</IonRouterLink>
          </IonText>
        </IonItem>
      </IonList>
    </form>
  );
};

export default LoginForm;
