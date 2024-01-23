import { FC } from "react";
import { ImageModel } from "../../../image/models/image";
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";

type Props = {
  image: ImageModel;
};

const ImageCard: FC<Props> = (props) => {
  if (!props.image || !props.image.labels) return;

  return (
    <IonCard>
      <img
        alt="Silhouette of mountains"
        src="https://ionicframework.com/docs/img/demos/card-media.png"
      />
      <IonCardHeader>
        <IonCardTitle>{props.image.name}</IonCardTitle>
        <IonCardSubtitle>{props.image.description}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonGrid>
          {props.image.labels.map((label) => (
            <IonRow>
              <IonCol size="10">{label.description}</IonCol>
              <IonCol size="2">
                <IonBadge color="tertiary">
                  {Math.floor(label.score * 100)} %
                </IonBadge>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default ImageCard;
