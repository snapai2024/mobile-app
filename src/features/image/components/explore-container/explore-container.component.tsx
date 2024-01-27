import "./explore-container.component.css";
import { FC, useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import LabelsModal from "../labels-modal/labels-modal.component";
import { useAnalyseImageMutation } from "../../services/api";
import {CameraPreview} from "@ionic-native/camera-preview";
import {b64toBlob} from "../../services/file";

interface ContainerProps {}

const ExploreContainer: FC<ContainerProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [analyseImage, { data: labels, isSuccess }] = useAnalyseImageMutation();

  useEffect(() => {
    if (isSuccess && labels) setIsModalOpen(true);
  }, [labels]);

  useEffect(() => {
    openCamera();
  }, [])

  const openCamera = async () => {
    let options = {
      x: 0,
      y: 100,
      width: window.screen.width / 2,
      height: window.screen.height / 2,
      camera: CameraPreview.CAMERA_DIRECTION.BACK,
      toBack: false,
      tapPhoto: true,
      tapFocus: false,
      previewDrag: false,
      storeToFile: false,
      disableExifHeaderStripping: false
    };

    await CameraPreview.startCamera(options);
  };

  const takePicture = async () => {
    const res = await CameraPreview.takePicture({width: 500, height: 500, quality: 85});

    const blob = b64toBlob(res, "image/png");

    const formData = new FormData();
    formData.append("file", blob, "image");

    setImageBlob(blob);

    analyseImage(formData);

    CameraPreview.stopCamera();
  }

  return (
    <>
      <div style={{ backgroundColor: 'grey' }}>
        <IonButton onClick={takePicture}>Analyse image</IonButton>
      </div>
      <LabelsModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageBlob={imageBlob!}
        labels={labels!}
      />
    </>
  );
};

export default ExploreContainer;
