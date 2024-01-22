import {apiClient} from "../../../common/services/api";
import {CreateUserDto, User} from "../models/user";
import {Collection} from "../../collection/models/collection";

export const getMyCollections = async (): Promise<Collection[]> => {
    const result = await apiClient.get(
        'user/me/collections',
    );

    return result.data.map((item: Collection) => {
        return {id: item.id, name: item.name, user: item.user, images: item.images}
    });
}

export const postUser = async (input: CreateUserDto): Promise<User> => {
    const result = await apiClient.post(
        'user',
        {
            email: input.email,
            password: input.password,
            roleId: 1
        }
    );

    return result.data;
}