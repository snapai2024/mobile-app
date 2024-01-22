import { IonItem, IonLabel, IonList } from "@ionic/react";
import { FC } from "react";
import { Collection } from "../../models/collection";

type Props = {
  collections: Collection[];
};

const CollectionList: FC<Props> = (props) => {
  return (
    <IonList lines="full">
      {props.collections.map((collection) => (
        <IonItem key={collection.id}>
          <IonLabel>{collection.name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default CollectionList;
