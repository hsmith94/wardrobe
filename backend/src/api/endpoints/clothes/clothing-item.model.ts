import { compact } from 'lodash';
import { DtoErrors } from '../../errors/dto-errors';
import { UserId } from '../../models/user.model';
import { jsonParse } from '../../utils/json-parse';
import { ClothingItemRow, ClothingItemRowDto } from './clothing-items.repo';

export type ClothingItemId = string;

type ClothingItemMetadata = {
    [key: string]: string | number;
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

export class ClothingItemDto {
    static fromClothesRow(row: ClothingItemRow): ClothingItem {
        const cleanProperties = (properties: ClothingItemProperty[]) => {
            return compact(properties);
        };
        return {
            itemId: row.item_id,
            userId: row.user_id,
            name: row.name,
            description: row.description,
            picture: row.picture,
            createDate: row.create_date,
            updateDate: row.update_date,
            properties: cleanProperties(jsonParse<ClothingItemProperty[]>(row.properties)),
        };
    }

    static from<T, U>(dto: T, val: U): ClothingItem {
        if (dto === ClothingItemRowDto) {
            return this.fromClothesRow(val as ClothingItemRow);
        } else {
            throw new DtoErrors.UnknownDtoError(dto);
        }
    }
}
