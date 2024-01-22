import {Collection} from "../../collection/models/collection";
import {Label} from "./label";

export interface Image {
    id: number;
    name: string;
    description: string;
    path: string;
    labels: Label[];
    collection: Collection
}

export interface CreateImageDto extends Omit<Image, 'id' | 'path' | 'collection'> {
    collectionId: number;
}