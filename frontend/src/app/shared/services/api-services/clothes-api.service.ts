import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClothingItem, ClothingItemId } from 'src/app/models/clothing-item.model';
import { DEFAULT_CLOTHING_ITEM_IMAGE } from '../../constants/images.constants';
import { BASE_URL_TOKEN } from '../../tokens/base-url.token';
import { makeUrl } from './make-url.util';

namespace Transforms {
    export function mapClothingItem(clothingItem: ClothingItem): ClothingItem {
        return {
            ...clothingItem,
            picture: clothingItem.picture ?? DEFAULT_CLOTHING_ITEM_IMAGE,
        };
    }
}

namespace Pipes {
    export function mapClothingItems() {
        return map((value: ClothingItem[]) => value.map(Transforms.mapClothingItem));
    }
    export function mapClothingItem() {
        return map((value: ClothingItem) => Transforms.mapClothingItem(value));
    }
}

@Injectable({
    providedIn: 'root',
})
export class ClothesApiService {
    // prettier-ignore
    constructor(
        @Inject(BASE_URL_TOKEN) private readonly BASE_URL: string,
        @Inject(HttpClient) private http: HttpClient,
    ) {}
    private makeUrl(...parts: string[]): string {
        return makeUrl(this.BASE_URL, ...parts);
    }
    getAllClothes(): Observable<ClothingItem[]> {
        return this.http.get<ClothingItem[]>(this.makeUrl('clothes')).pipe(Pipes.mapClothingItems());
    }
    getClothingItem(itemId: ClothingItemId): Observable<ClothingItem> {
        return this.http.get<ClothingItem>(this.makeUrl('clothes', itemId)).pipe(Pipes.mapClothingItem());
    }
}
