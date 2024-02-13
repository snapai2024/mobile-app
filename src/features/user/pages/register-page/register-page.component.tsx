import React, {FC} from 'react';
import {IonContent, IonImg, IonPage} from "@ionic/react";
import RegisterForm from "../../components/register-form";
import Logo from "../../../../../public/assets/logo.png";

const RegisterPage: FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <IonImg style={{maxHeight: '150px'}} src={Logo} alt="Logo"/>
                    <RegisterForm/>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default RegisterPage;