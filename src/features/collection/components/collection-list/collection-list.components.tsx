import { IonBadge, IonItem, IonLabel, IonList } from "@ionic/react";
import { FC } from "react";
import { Collection } from "../../models/collection";
import { useHistory } from "react-router";

type Props = {
  collections: Collection[];
};

const CollectionList: FC<Props> = (props) => {
  const history = useHistory();

  return (
    <>
      <IonList inset>
        {props.collections.map((collection) => (
          <IonItem
            key={collection.id}
            onClick={() => history.push(`/collections/${collection.id}`)}
          >
            <IonLabel>{collection.name}</IonLabel>
            <IonBadge color="primary">{collection.images.length}</IonBadge>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default CollectionList;
