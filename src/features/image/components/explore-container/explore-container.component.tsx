import "./explore-container.component.css";
import { FC, useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { b64toBlob } from "../../services/file";
import LabelsModal from "../labels-modal/labels-modal.component";
import { useAnalyseImageMutation } from "../../services/api";

interface ContainerProps {}

const ExploreContainer: FC<ContainerProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [analyseImage, { data: labels, isSuccess }] = useAnalyseImageMutation();

  useEffect(() => {
    if (isSuccess && labels) setIsModalOpen(true);
  }, [labels]);

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });

    if (!image) return;

    const blob = b64toBlob(image.base64String!, "image/png");

    const formData = new FormData();
    formData.append("file", blob, "image");

    setImageBlob(blob);

    analyseImage(formData);
  };

  return (
    <div id="container">
      <IonButton onClick={takePicture}>Analyse image</IonButton>
      <LabelsModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageBlob={imageBlob!}
        labels={labels!}
      />
    </div>
  );
};

export default ExploreContainer;
