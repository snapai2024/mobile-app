import React, {FC} from 'react';
import {IonContent, IonPage} from "@ionic/react";
import RegisterForm from "../../components/register-form";

const RegisterPage: FC = () => {
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
                    <RegisterForm />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default RegisterPage;