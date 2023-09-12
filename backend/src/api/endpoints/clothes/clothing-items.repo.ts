import { Connection } from '../../../datasource/datasource';
import { HttpErrors } from '../../errors/http-errors';
import { UserId } from '../../models/user.model';
import { ClothingItem, ClothingItemDto, ClothingItemId } from './clothing-item.model';

export interface ClothingItemRow {
    item_id: ClothingItemId;
    user_id: UserId;
    name: string;
    description: string;
    picture: string;
    create_date: Date;
    update_date: Date;
    delete_date?: Date;
    properties: string;
}

export class ClothingItemRowDto {}

namespace QueryBuilder {
    namespace Errors {
        export class RequiredPropertyError extends Error {
            constructor(property: string) {
                const prototype = new.target.prototype;
                super(`Missing required property: ${property}`);
                Object.setPrototypeOf(this, prototype);
                this.name = 'ApiError';
            }
        }
    }

    type BuiltQueryParts = {
        query: string;
        params: any[];
    };

    function buildSelectItemsQuery(options: { userId: string; itemId?: string }): BuiltQueryParts {
        const { userId, itemId } = options;

        const conditions = [
            {
                query: 'AND items.user_id = ?',
                params: [userId],
            },
        ];

        if (itemId !== undefined) {
            conditions.push({
                query: 'AND items.item_id = ?',
                params: [itemId],
            });
        }

        return {
            query: `
                SELECT
                    items.*,
                    JSON_ARRAYAGG(
                        IF(
                            item_properties.property_key IS NULL,
                            -- then
                            NULL,
                            -- else
                            JSON_OBJECT(
                                'key', item_properties.property_key,
                                'value', item_properties.value,
                                'metadata', CAST(item_properties.metadata AS JSON)
                            )
                        )
                    ) AS properties
                FROM items
                LEFT JOIN item_properties ON items.item_id = item_properties.item_id
                WHERE items.delete_date IS NULL
                    ${conditions.map((condition) => condition.query).join('\n')}
                GROUP BY items.item_id
            `,
            params: [...conditions.flatMap((condition) => condition.params)],
        };
    }

    export function buildSelectAllItemsQuery(userId: string): BuiltQueryParts {
        if (userId === undefined || userId === null || userId === '') {
            throw new Errors.RequiredPropertyError('userId');
        }
        return buildSelectItemsQuery({ userId });
    }

    export function buildSelectItemQuery(userId: string, itemId: string): BuiltQueryParts {
        if (userId === undefined || userId === null || userId === '') {
            throw new Errors.RequiredPropertyError('userId');
        }
        if (itemId === undefined || itemId === null || itemId === '') {
            throw new Errors.RequiredPropertyError('itemId');
        }
        return buildSelectItemsQuery({ userId, itemId });
    }
}

export class ClothingItemsRepo {
    constructor(private connection: Connection) {}

    async getClothingItems(userId: UserId): Promise<ClothingItem[]> {
        const { query, params } = QueryBuilder.buildSelectAllItemsQuery(userId);
        const rows = await this.connection.query<ClothingItemRow>(query, params);
        const clothingItems = rows.map((row) => ClothingItemDto.from(ClothingItemRowDto, row));
        console.log(JSON.stringify(clothingItems, null, 2));
        return clothingItems;
    }

    async getClothingItem(userId: UserId, itemId: ClothingItemId): Promise<ClothingItem> {
        const { query, params } = QueryBuilder.buildSelectItemQuery(userId, itemId);
        const rows = await this.connection.query<ClothingItemRow>(query, params);
        if (rows.length === 0) {
            throw new HttpErrors.NotFoundError(`Clothing Item with id "${itemId}" not found`);
        }
        if (rows.length > 1) {
            throw new Error(`Too many Clothing Items found with id "${itemId}"`);
        }
        const row = rows[0];
        const clothingItem = ClothingItemDto.from(ClothingItemRowDto, row);
        return clothingItem;
    }
}

export class ClothingItemsRepoInMemory extends ClothingItemsRepo {
    clothingItemsAllUsers: ClothingItem[] = [
        {
            itemId: 'c48933d5-46ae-11ee-a93f-0242ac140002',
            userId: 'HARRY',
            name: 'White shirt',
            description: 'An Oxford cotton shirt from TM Lewin',
            picture: null,
            createDate: new Date('2023-08-29T19:58:13.000Z'),
            updateDate: new Date('2023-08-29T19:58:13.000Z'),
            properties: [
                {
                    key: 'MATERIAL',
                    value: 'ELASTANE',
                    metadata: {
                        percentage: 10,
                    },
                },
                {
                    key: 'MATERIAL',
                    value: 'COTTON',
                    metadata: {
                        subtype: 'OXFORD',
                        percentage: 90,
                    },
                },
                {
                    key: 'HAS_PATTERN',
                    value: 'FALSE',
                    metadata: null,
                },
                {
                    key: 'COLOR',
                    value: 'WHITE',
                    metadata: null,
                },
            ],
        },
        {
            itemId: 'c5b75e75-4a9a-11ee-ad74-0242ac140002',
            userId: 'HARRY',
            name: 'Pink stretch shirt',
            description: 'A stretch cotton shirt from TM Lewin',
            picture: null,
            createDate: new Date('2023-09-03T19:45:09.000Z'),
            updateDate: new Date('2023-09-03T19:45:09.000Z'),
            properties: [],
        },
        {
            itemId: 'c5cdabe6-4a9a-11ee-ad74-0242ac140002',
            userId: 'HARRY',
            name: 'Pink linen shirt',
            description: 'A linen shirt from TM Lewin',
            picture:
                'https://wardrobe-public.s3.eu-west-2.amazonaws.com/app-assets/user-uploads/TEST/TEST-Mens-Pink-Long-Sleeve-Linen-Shirt.jpeg',
            createDate: new Date('2023-09-03T19:45:09.000Z'),
            updateDate: new Date('2023-09-03T19:45:09.000Z'),
            properties: [],
        },
        {
            itemId: 'c5ce6148-4a9a-11ee-ad74-0242ac140002',
            userId: 'HARRY',
            name: 'White linen shirt',
            description: 'A white linen shirt from Charles Tyrwhitt, bought from British Heart Foundation',
            picture:
                'https://wardrobe-public.s3.eu-west-2.amazonaws.com/app-assets/user-uploads/TEST/TEST-Mens-White-Long-Sleeve-Linen-Shirt.jpeg',
            createDate: new Date('2023-09-03T19:45:09.000Z'),
            updateDate: new Date('2023-09-03T19:45:09.000Z'),
            properties: [
                {
                    key: 'MATERIAL',
                    value: 'LINEN',
                    metadata: {
                        percentage: 100,
                    },
                },
            ],
        },
        {
            itemId: '11f24178-b397-4d9a-ae69-ab0c8dfe5211',
            userId: 'LENA',
            name: 'Pink skirt',
            description: '',
            picture: null,
            createDate: new Date('2023-09-03T19:45:09.000Z'),
            updateDate: new Date('2023-09-03T19:45:09.000Z'),
            properties: [],
        },
        {
            itemId: 'cebf55cd-9a92-4e3d-afa2-cf3e3ba15f6e',
            userId: 'LENA',
            name: 'White rollneck',
            description: 'A white rollneck sweater from Uniqlo',
            picture: null,
            createDate: new Date('2023-09-04T19:20:09.000Z'),
            updateDate: new Date('2023-09-04T19:20:09.000Z'),
            properties: [
                {
                    key: 'COLOR',
                    value: 'WHITE',
                    metadata: null,
                },
                {
                    key: 'MATERIAL',
                    value: 'COTTON',
                    metadata: {
                        percentage: 100,
                    },
                },
            ],
        },
    ];

    constructor() {
        super(undefined as any);
    }

    async getClothingItems(userId: UserId): Promise<ClothingItem[]> {
        return this.clothingItemsAllUsers.filter((item) => item.userId === userId);
    }

    async getClothingItem(userId: UserId, itemId: ClothingItemId): Promise<ClothingItem> {
        const clothingItems = await this.getClothingItems(userId);
        const item = clothingItems.find((item) => item.itemId === itemId);
        if (item === undefined) {
            throw new HttpErrors.NotFoundError(`Clothing Item with id "${itemId}" not found`);
        }
        return item;
    }
}
