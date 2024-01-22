import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { CollectionList } from "../../components/collection-list";
import { getMyCollections } from "../../../user/services/api";
import { Collection } from "../../models/collection";
import { AddCollectionModal } from "../../components/add-collection-modal";

const CollectionListPage: FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getMyCollections().then((result) => {
      setCollections(result);
    });
  }, [setCollections]);

  if (!collections) return <div> Erreur ! </div>;

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Mes collections</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => setIsModalOpen(true)}>
                Ajouter
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <CollectionList collections={collections} />
        </IonContent>
      </IonPage>
      <AddCollectionModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default CollectionListPage;
