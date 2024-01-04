import React, {FC} from 'react';
import {IonContent, IonPage} from "@ionic/react";
import LoginForm from "../../components/login-form/login-form.component";

const LoginPage: FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <LoginForm />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;