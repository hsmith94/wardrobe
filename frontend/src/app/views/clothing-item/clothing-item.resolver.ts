import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ClothingItem } from 'src/app/models/clothing-item.model';
import { ClothesApiService } from 'src/app/shared/services/api-services/clothes-api.service';

export const clothingItemResolver: ResolveFn<ClothingItem> = (route, state, clothesApi = inject(ClothesApiService)) => {
    const itemId = route.params['id'];
    return clothesApi.getClothingItem(itemId);
};
