import './ExploreContainer.css';
import {FC} from "react";
import {IonButton} from "@ionic/react";
import {Camera, CameraResultType} from "@capacitor/camera";
import {analyseImage} from "../services/api";
import {b64toBlob} from "../services/file";

interface ContainerProps { }

const ExploreContainer: FC<ContainerProps> = () => {

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64,
        });

        if (!image) return;

        const blob = b64toBlob(image.base64String!, 'image/png');

        const formData = new FormData();
        formData.append('file', blob, "image");

        const result = await analyseImage(formData);

        console.log(result);
    }

  return (
    <div id="container">
      <IonButton onClick={takePicture}>Analyse image</IonButton>
    </div>
  );
};

export default ExploreContainer;
