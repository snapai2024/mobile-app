import React, {FC} from 'react';
import {AuthCredentials} from "../../models/auth";
import {useForm} from "react-hook-form";
import {IonButton, IonInput, IonItem, IonList, IonRouterLink, IonText} from "@ionic/react";
import {authenticate} from "../../services/api";
import {useAuthentication} from "../../../../common/hooks/use-authentication";

const LoginForm: FC = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthCredentials>()
    const { login } = useAuthentication()


    const onSubmit = async (data: AuthCredentials) => {
        if (!data) return;

        const result = await authenticate(data);

        if (result) {
            login(result.token)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <IonList inset>
                <IonItem>
                    <IonInput label="Adresse email" {...register("email", { required: true })} />
                    {errors.email && (<IonText color="danger">L'adresse email est requise.</IonText>)}
                </IonItem>
                <IonItem>
                    <IonInput type="password" label="Mot de passe" {...register("password", { required: true })} />
                    {errors.password && (<IonText color="danger">Le mot de passe est requis.</IonText>)}
                </IonItem>
                <IonButton className="ion-margin-top" type="submit" expand="block">
                    Connexion
                </IonButton>
                <IonItem>
                    <IonText> Pas de compte ? <IonRouterLink href="/register">S'inscrire</IonRouterLink></IonText>
                </IonItem>
            </IonList>
        </form>
    );
};

export default LoginForm;