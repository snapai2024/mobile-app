import {User} from "../../user/models/user";
import {Image} from "../../image/models/image";

export interface Collection {
    id: number;
    name: string;
    user: User;
    images: Image[];
}

export interface CreateCollectionDto extends Omit<Collection, 'id' | 'user' | 'images'> {}