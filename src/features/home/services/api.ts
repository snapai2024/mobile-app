import {apiClient} from "../../../common/services/api";

export const analyseImage = async (data: FormData): Promise<string> => {
    const result = await apiClient.post(
        'image/analyse',
        data
    );

    return result.data;
}