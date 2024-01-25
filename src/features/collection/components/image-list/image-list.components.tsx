import { IonContent, IonList } from "@ionic/react";
import { FC } from "react";
import { ImageModel } from "../../../image/models/image";
import { ImageCard } from "../image-card";

type Props = {
  images: ImageModel[];
};

const ImageList: FC<Props> = (props) => {
  if (!props.images.length)
    return (
      <IonContent className="ion-padding">
        Aucune image dans cette collection.
      </IonContent>
    );

  return (
    <>
      <IonList inset>
        {props.images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </IonList>
    </>
  );
};

export default ImageList;
