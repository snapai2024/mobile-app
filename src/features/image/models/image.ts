import { Collection } from "../../collection/models/collection";
import { Label } from "./label";

export interface ImageModel {
  id: number;
  name: string;
  description: string;
  path: string;
  labels: Label[];
  collection: Collection;
}

export interface ImageFormData
  extends Omit<ImageModel, "id" | "path" | "collection"> {
  collectionId: number;
}

export interface ImageRequest {
  id?: number;
  data: FormData;
}
