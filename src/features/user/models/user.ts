import {Collection} from "../../collection/models/collection";

interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    uid: string;
    email: string;
    password: string;
    role: Role;
    collections: Collection[];
}

export interface CreateUserDto extends Omit<User, 'id' | 'uid' | 'role' | 'collections'>{
    repeatPassword: string;
    roleId: number;
}