import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ClothingItem } from 'src/app/models/clothing-item.model';
import { ClothesApiService } from 'src/app/shared/services/api-services/clothes-api.service';

export const clothesResolver: ResolveFn<ClothingItem[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    clothesApi = inject(ClothesApiService),
): Observable<ClothingItem[]> => {
    const allClothes$ = clothesApi.getAllClothes().pipe(take(1));
    return allClothes$;
};
