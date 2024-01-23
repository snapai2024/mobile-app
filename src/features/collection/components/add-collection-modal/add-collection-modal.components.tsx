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
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { CollectionRequest } from "../../models/collection";
import { useForm } from "react-hook-form";
import { usePostCollectionMutation } from "../../services/api";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddCollectionModal: FC<Props> = (props) => {
  const { register, handleSubmit } = useForm<CollectionRequest>();
  const [postCollection, { data: collection, isSuccess }] =
    usePostCollectionMutation();

  useEffect(() => {
    if (isSuccess && collection) {
      props.setIsModalOpen(false);
      toast.success("Collection enregistrée.");
    }
  }, [collection]);

  const onSubmit = async (data: CollectionRequest) => postCollection(data);

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
