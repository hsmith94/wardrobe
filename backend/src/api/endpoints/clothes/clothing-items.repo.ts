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
