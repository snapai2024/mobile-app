import { UserModel } from "../../user/models/user";
import { ImageModel } from "../../image/models/image";

export interface Collection {
  id: number;
  name: string;
  user: UserModel;
  images: ImageModel[];
}

export interface CollectionRequest
  extends Omit<Collection, "id" | "user" | "images"> {}
