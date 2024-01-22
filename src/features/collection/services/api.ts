import { apiClient } from "../../../common/services/api";
import { Collection, CreateCollectionDto } from "../models/collection";

export const createCollection = async (
  data: CreateCollectionDto
): Promise<Collection> => {
  const result = await apiClient.post("collection", data);

  return result.data;
};
