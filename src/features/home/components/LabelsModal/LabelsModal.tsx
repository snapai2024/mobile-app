import './LabelsModal.css';
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem, IonLabel, IonList,
    IonModal, IonNote, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {Label} from "../../models/label";
import './LabelsModal.css'
import {Controller, useForm} from "react-hook-form";
import {getMyCollections} from "../../../user/services/api";
import {Collection} from "../../../collection/models/collection";
import {CreateImageDto} from "../../../image/models/image";

interface LabelsModalProps {
    isOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    labels: Label[]
}

const LabelsModal: FC<LabelsModalProps> = (props) => {
    const {
        register,
        control,
        handleSubmit,
    } = useForm<CreateImageDto>()
    const [collections, setCollections] = useState<Collection[]>([])

    useEffect(() => {
        getMyCollections().then((result) => {
            setCollections(result);
        })
    }, [])

    const onSubmit = async (data: CreateImageDto) => {
        console.log(data);
    }

    if (!collections) return <div> erreur ! </div>;

  return (
      <IonModal isOpen={props.isOpen}>
          <IonHeader>
              <IonToolbar>
                  <IonButtons slot="start">
                      <IonButton onClick={() => props.setIsModalOpen(false)}>Cancel</IonButton>
                  </IonButtons>
                  <IonTitle>Analyse</IonTitle>
                  <IonButtons slot="end">
                      <IonButton strong={true} onClick={handleSubmit(onSubmit)}>
                          Confirm
                      </IonButton>
                  </IonButtons>
              </IonToolbar>
          </IonHeader>

          <IonContent>
              <IonList inset>
                  {props.labels.map((label) => (
                      <IonItem key={label.description}>
                          <IonLabel slot="start">{label.description}</IonLabel>
                          <IonNote slot="end">{label.score}%</IonNote>
                      </IonItem>
                  ))}
              </IonList>

              <form onSubmit={handleSubmit(onSubmit)}>
                  <IonList inset>
                      <IonItem>
                          <IonInput label="Nom" {...register('name')} />
                          <IonInput label="Description" {...register('description')} />
                          <Controller
                              name='collectionId'
                              control={control}
                              render={({ field: { onChange, ...rest}}) => (
                                  <IonSelect label="Collection" labelPlacement="fixed" multiple={false} onChange={(val) => console.log(val)} {...rest}>
                                      {
                                          collections.map((collection) => (
                                              <IonSelectOption key={collection.id} value={collection.id}>{collection.name}</IonSelectOption>
                                          ))
                                      }
                                  </IonSelect>
                                )}
                          />
                      </IonItem>
                  </IonList>
              </form>
          </IonContent>
      </IonModal>
  );
};

export default LabelsModal;
