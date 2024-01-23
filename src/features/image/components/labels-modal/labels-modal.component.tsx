import "./labels-modal.component.css";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Label } from "../../models/label";
import { Controller, useForm } from "react-hook-form";
import { useGetMyCollectionsQuery } from "../../../user/services/api";
import { ImageFormData } from "../../models/image";
import { usePostImageMutation } from "../../services/api";

interface LabelsModalProps {
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  labels: Label[];
  imageBlob: Blob;
}

const LabelsModal: FC<LabelsModalProps> = (props) => {
  const { register, control, handleSubmit } = useForm<ImageFormData>();
  const { data: myCollections } = useGetMyCollectionsQuery();
  const [postImage, { data: createdImage, isSuccess }] = usePostImageMutation();

  useEffect(() => {
    if (isSuccess && createdImage) props.setIsModalOpen(false);
  }, [createdImage]);

  const onSubmit = async (data: ImageFormData) => {
    const imageData: ImageFormData = {
      name: data.name,
      description: data.description,
      collectionId: data.collectionId,
      labels: props.labels,
    };

    const formData = new FormData();
    formData.append("image", JSON.stringify(imageData));
    formData.append("file", props.imageBlob, "image");

    postImage({ data: formData });
  };

  if (!myCollections || !myCollections.length || !props.labels) return;

  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => props.setIsModalOpen(false)}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Analyse</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={handleSubmit(onSubmit)}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList inset>
          {props.labels.map((label) => (
            <IonItem key={label.description}>
              <IonLabel slot="start">{label.description}</IonLabel>
              <IonNote slot="end">{Math.floor(label.score * 100)}%</IonNote>
            </IonItem>
          ))}
        </IonList>

        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList inset>
            <IonItem>
              <IonInput label="Nom" {...register("name", { required: true })} />
              <IonInput
                label="Description"
                {...register("description", { required: true })}
              />
              <Controller
                name="collectionId"
                control={control}
                defaultValue={myCollections[0].id}
                render={({ field }) => (
                  <IonSelect
                    label="Collection"
                    labelPlacement="fixed"
                    multiple={false}
                    onIonChange={(e) => field.onChange(e)}
                    {...field}
                  >
                    {myCollections.map((collection) => (
                      <IonSelectOption
                        key={collection.id}
                        value={collection.id}
                      >
                        {collection.name}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                )}
              />
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default LabelsModal;
