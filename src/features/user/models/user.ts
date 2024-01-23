import { Collection } from "../../collection/models/collection";

interface Role {
  id: number;
  name: string;
}

export interface UserFormData {
  id?: number;
  email?: string;
  password?: string;
  repeatPassword?: string;
}

export interface UserRequest extends Omit<UserFormData, "repeatPassword"> {}

export interface UserResponse extends UserModel {}

export interface UserModel {
  id: number;
  uid: string;
  email: string;
  password: string;
  role: Role;
  collections: Collection[];
}
