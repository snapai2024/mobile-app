import { IonPage } from "@ionic/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import CollectionDetail from "../../components/collection-detail/collection-detail.components";

const CollectionDetailPage: FC = () => {
  const { collectionId } = useParams();

  if (!collectionId) return;

  return (
    <IonPage>
      <CollectionDetail collectionId={collectionId} />
    </IonPage>
  );
};

export default CollectionDetailPage;
