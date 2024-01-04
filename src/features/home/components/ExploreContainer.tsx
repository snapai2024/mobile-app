import './ExploreContainer.css';
import {FC} from "react";
import {IonButton} from "@ionic/react";
import {Camera, CameraResultType} from "@capacitor/camera";
import {analyseImage} from "../services/api";

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

    const b64toBlob = (b64Data: string, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    }

  return (
    <div id="container">
      <IonButton onClick={takePicture}>Analyse image</IonButton>
    </div>
  );
};

export default ExploreContainer;
