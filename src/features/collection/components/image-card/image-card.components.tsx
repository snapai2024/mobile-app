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
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { useGetFileQuery } from "../../../../common/services/api";
import { useDeleteImageMutation } from "../../../image/services/api";
import { toast } from "react-toastify";
import { trashOutline } from "ionicons/icons";

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
        <IonCardTitle>
          <IonText>
            <h2>{props.image.name}</h2>
          </IonText>
          </IonCardTitle>
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
        <div 
          style={{ width: '100%', display: 'flex', justifyContent: 'center'}}
        >
          <IonButton
            color="danger"
            onClick={() => deleteImage(props.image.id)}
          >
            <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ImageCard;
