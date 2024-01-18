import './ExploreContainer.css';
import {FC, useState} from "react";
import {IonButton} from "@ionic/react";
import {Camera, CameraResultType} from "@capacitor/camera";
import {analyseImage} from "../../services/api";
import {b64toBlob} from "../../services/file";
import LabelsModal from "../LabelsModal/LabelsModal";
import {Label} from "../../models/label";

interface ContainerProps { }

const ExploreContainer: FC<ContainerProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [labels, setLabels] = useState<Label[]>([])

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

        const result: Label[] = await analyseImage(formData);

        if (result) {
            setLabels(result);
            setIsModalOpen(true);
        }
    }

  return (
    <div id="container">
      <IonButton onClick={takePicture}>Analyse image</IonButton>
        <LabelsModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} labels={labels} />
    </div>
  );
};

export default ExploreContainer;
