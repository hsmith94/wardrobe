import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClothingItem, ClothingItemId } from 'src/app/models/clothing-item.model';
import { BASE_URL_TOKEN } from '../../tokens/base-url.token';
import { makeUrl } from './make-url.util';

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
        return this.http.get<ClothingItem[]>(this.makeUrl('clothes'));
    }
    getClothingItem(itemId: ClothingItemId): Observable<ClothingItem> {
        return this.http.get<ClothingItem>(this.makeUrl('clothes', itemId));
    }
}
