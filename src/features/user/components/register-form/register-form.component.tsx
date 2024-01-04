import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {IonButton, IonInput, IonItem, IonList, IonRouterLink, IonText} from "@ionic/react";
import {CreateUserDto} from "../../models/user";
import {postUser} from "../../services/api";
import {useHistory} from "react-router";

const RegisterForm: FC = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserDto>()
    const history = useHistory();

    const onSubmit = async (data: CreateUserDto) => {
        if (!data) return;

        const result = await postUser(data);

        if (result) {
            history.push('/login')
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
                <IonItem>
                    <IonInput type="password" label="Répétez mot de passe" {...register("repeatPassword", { required: true })} />
                    {errors.repeatPassword && (<IonText color="danger">Les mots de passe ne correspondent pas.</IonText>)}
                </IonItem>
                <IonButton className="ion-margin-top" type="submit" expand="block">
                    Inscription
                </IonButton>
                <IonItem>
                    <IonText> Déjà un compte ? <IonRouterLink href="/login">Se connecter</IonRouterLink></IonText>
                </IonItem>
            </IonList>
        </form>
    );
};

export default RegisterForm;