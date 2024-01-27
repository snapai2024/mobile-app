import "./explore-container.component.css";
import { FC, useEffect, useState } from "react";
import {IonButton, IonIcon} from "@ionic/react";
import LabelsModal from "../labels-modal/labels-modal.component";
import { useAnalyseImageMutation } from "../../services/api";
import {CameraPreview} from "@ionic-native/camera-preview";
import {b64toBlob} from "../../services/file";
import {appsOutline} from "ionicons/icons";

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

    return () => {
      CameraPreview.stopCamera();
    }
  }, [])

  const openCamera = async () => {
    let options = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height * 0.75,
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
      <IonButton
          style={{ width: '70%', position: 'fixed', bottom: '10px', left: 0, right: 0, margin: '0 auto' }}
          onClick={takePicture}
          strong={true}>
        <IonIcon slot="start" icon={appsOutline}></IonIcon>
        Analyser
      </IonButton>
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
