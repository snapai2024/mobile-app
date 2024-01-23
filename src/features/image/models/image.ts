import { Label } from "./label";

export interface ImageModel {
  id: number;
  name: string;
  description: string;
  path: string;
  labels: Label[];
  collectionId: number;
}

export interface ImageFormData extends Omit<ImageModel, "id" | "path"> {}

export interface ImageRequest {
  id?: number;
  data: FormData;
}
