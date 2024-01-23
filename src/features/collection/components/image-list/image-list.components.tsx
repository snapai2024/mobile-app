import { IonList } from "@ionic/react";
import { FC } from "react";
import { ImageModel } from "../../../image/models/image";
import { ImageCard } from "../image-card";

type Props = {
  images: ImageModel[];
};

const ImageList: FC<Props> = (props) => {
  if (!props.images.length)
    return <div> Aucune image dans cette collection. </div>;

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
