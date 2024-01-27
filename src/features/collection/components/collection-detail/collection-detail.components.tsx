import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, useEffect } from "react";
import { useDeleteCollectionMutation, useGetCollectionByIdQuery } from "../../services/api";
import { useHistory } from "react-router";
import { ImageList } from "../image-list";
import { trashOutline } from "ionicons/icons";
import { toast } from "react-toastify";

type Props = {
  collectionId: number;
};

const CollectionDetail: FC<Props> = (props) => {
  const { data: collection } = useGetCollectionByIdQuery(props.collectionId);
  const [deleteCollection, { isSuccess, isError, error }] = useDeleteCollectionMutation();
  const history = useHistory();

  useEffect(() => {
    if (isSuccess) {
      history.push('/collections');
      toast.success("Collection supprimée.");
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      // @ts-ignore
      toast.error(error.data.error.message);
    }
  }, [isError])

  const onDelete = () => {
    if (!collection) return;

    deleteCollection(collection.id);
  }

  if (!collection) return;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push("/collections")}>
              Retour
            </IonButton>
          </IonButtons>
          <IonTitle>{collection.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDelete}>
              <IonIcon color="danger" slot="icon-only" icon={trashOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ImageList images={collection.images} />
      </IonContent>
    </>
  );
};

export default CollectionDetail;
