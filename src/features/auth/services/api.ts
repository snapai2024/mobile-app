import {AuthCredentials, AuthToken} from "../models/auth";
import {apiClient} from "../../../common/services/api";

export const authenticate = async (credentials: AuthCredentials): Promise<AuthToken> => {
    const result = await apiClient.post(
        'authenticate',
        {
            email: credentials.email,
            password: credentials.password
        }
    );

    return result.data;
}