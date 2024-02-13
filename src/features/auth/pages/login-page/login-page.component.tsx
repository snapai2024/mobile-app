import React, {FC} from 'react';
import {IonContent, IonImg, IonPage} from "@ionic/react";
import LoginForm from "../../components/login-form/login-form.component";
import Logo from "../../../../../public/assets/logo.png"

const LoginPage: FC = () => {
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
                    <IonImg style={{ maxHeight: '150px' }} src={Logo} alt="Logo" />
                    <LoginForm />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;