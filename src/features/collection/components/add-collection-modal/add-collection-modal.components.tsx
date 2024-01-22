import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Dispatch, FC, SetStateAction } from "react";
import { Collection, CreateCollectionDto } from "../../models/collection";
import { useForm } from "react-hook-form";
import { createCollection } from "../../services/api";

interface Props {
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddCollectionModal: FC<Props> = (props) => {
  const { register, handleSubmit } = useForm<CreateCollectionDto>();

  const onSubmit = async (data: CreateCollectionDto) => {
    const createdImage: Collection = await createCollection(data);

    if (createdImage) {
      props.setIsModalOpen(false);
      return;
    }
  };

  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => props.setIsModalOpen(false)}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Ajouter une collection</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={handleSubmit(onSubmit)}>
              Confirmer
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList inset>
            <IonItem>
              <IonInput label="Nom" {...register("name", { required: true })} />
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default AddCollectionModal;
