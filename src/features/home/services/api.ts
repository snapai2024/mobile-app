import {apiClient} from "../../../common/services/api";
import {Label} from "../models/label";

export const analyseImage = async (data: FormData): Promise<Label[]> => {
    const result = await apiClient.post(
        'image/analyse',
        data
    );

    return result.data.map((item: Label) => {
        return {description: item.description, score: Math.round(item.score * 100)}
    });
}