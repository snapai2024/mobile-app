import {apiClient} from "../../../common/services/api";
import {CreateUserDto, User} from "../models/user";

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