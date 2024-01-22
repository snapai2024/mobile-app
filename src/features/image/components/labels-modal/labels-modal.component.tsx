import "./labels-modal.component.css";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
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
import { getMyCollections } from "../../../user/services/api";
import { Collection } from "../../../collection/models/collection";
import { CreateImageDto, Image } from "../../models/image";
import { createImage } from "../../services/api";

interface LabelsModalProps {
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  labels: Label[];
  imageBlob: Blob;
}

const LabelsModal: FC<LabelsModalProps> = (props) => {
  const { register, control, handleSubmit } = useForm<CreateImageDto>();
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    getMyCollections().then((result) => {
      setCollections(result);
    });
  }, [setCollections]);

  const onSubmit = async (data: CreateImageDto) => {
    const imageData: CreateImageDto = {
      name: data.name,
      description: data.description,
      collectionId: data.collectionId,
      labels: props.labels,
    };

    const formData = new FormData();
    formData.append("image", JSON.stringify(imageData));
    formData.append("file", props.imageBlob, "image");

    const createdImage: Image = await createImage(formData);

    if (createdImage) {
      props.setIsModalOpen(false);
      return;
    }
  };

  if (!collections.length) return <div> erreur ! </div>;

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
              <IonNote slot="end">{label.score}%</IonNote>
            </IonItem>
          ))}
        </IonList>

        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList inset>
            <IonItem>
              <IonInput label="Nom" {...register("name")} />
              <IonInput label="Description" {...register("description")} />
              <Controller
                name="collectionId"
                control={control}
                defaultValue={collections[0].id}
                render={({ field }) => (
                  <IonSelect
                    label="Collection"
                    labelPlacement="fixed"
                    multiple={false}
                    onIonChange={(e) => field.onChange(e)}
                    {...field}
                  >
                    {collections.map((collection) => (
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
