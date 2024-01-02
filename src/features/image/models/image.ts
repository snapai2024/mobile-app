export interface Image {
    id: number;
    name: string;
    description: string;
    path: string;
    labels: string;
}

export interface CreateImageDto extends Omit<Image, 'id' | 'path'> {
    collectionId: number;
}