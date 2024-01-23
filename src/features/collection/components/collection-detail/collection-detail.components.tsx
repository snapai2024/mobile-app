import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { useGetCollectionByIdQuery } from "../../services/api";
import { useHistory } from "react-router";
import { ImageList } from "../image-list";

type Props = {
  collectionId: number;
};

const CollectionDetail: FC<Props> = (props) => {
  const { data: collection } = useGetCollectionByIdQuery(props.collectionId);
  const history = useHistory();

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
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ImageList images={collection.images} />
      </IonContent>
    </>
  );
};

export default CollectionDetail;
