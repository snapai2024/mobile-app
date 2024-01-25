import "./labels-modal.component.css";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonRow,
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
import { toast } from "react-toastify";

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
    if (isSuccess && createdImage) {
      props.setIsModalOpen(false);
      toast.success("Image enregistrée.");
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList inset style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <IonGrid>
              {props.labels.map((label) => (
                <IonRow key={label.score}>
                  <IonCol size="10">{label.description}</IonCol>
                  <IonCol size="2">
                    <IonBadge color="tertiary">
                      {Math.floor(label.score * 100)} %
                    </IonBadge>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonList>
          <IonList inset style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
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
