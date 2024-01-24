import { FC, useEffect } from "react";
import { ImageModel } from "../../../image/models/image";
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { useGetFileQuery } from "../../../../common/services/api";
import { useDeleteImageMutation } from "../../../image/services/api";
import { toast } from "react-toastify";

type Props = {
  image: ImageModel;
};

const ImageCard: FC<Props> = (props) => {
  const { data: image } = useGetFileQuery(props.image.path);
  const [deleteImage, { isSuccess }] = useDeleteImageMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Image supprimée.");
    }
  }, [isSuccess]);

  if (!props.image || !props.image.labels) return;

  return (
    <IonCard>
      <IonCardHeader>
        <img alt={props.image.name} src={image?.url} />
        <IonCardTitle>{props.image.name}</IonCardTitle>
        <IonCardSubtitle>{props.image.description}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonGrid>
          {props.image.labels.map((label) => (
            <IonRow key={label.score}>
              <IonCol size="10">{label.description}</IonCol>
              <IonCol size="2">
                <IonBadge color="tertiary">
                  {Math.floor(label.score * 100)} %
                </IonBadge>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        <IonButton
          size="small"
          style={{ width: "100%" }}
          onClick={() => deleteImage(props.image.id)}
        >
          Supprimer
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ImageCard;
