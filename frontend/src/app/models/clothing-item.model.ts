import { UserId } from './user.model';

export type ClothingItemId = string;

type ClothingItemMetadata = {
    [key: string]: string;
};

type ClothingItemProperty = {
    key: string;
    value: string;
} & {
    metadata: ClothingItemMetadata;
};

export interface ClothingItem {
    itemId: ClothingItemId;
    userId: UserId;
    name: string;
    description: string;
    picture: string;
    createDate: Date;
    updateDate: Date;
    properties: ClothingItemProperty[];
}
