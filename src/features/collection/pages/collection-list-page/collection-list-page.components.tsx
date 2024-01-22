import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, useState } from "react";
import { CollectionList } from "../../components/collection-list";
import { AddCollectionModal } from "../../components/add-collection-modal";
import { useGetMyCollectionsQuery } from "../../../user/services/api";

const CollectionListPage: FC = () => {
  const { data: collections } = useGetMyCollectionsQuery();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
