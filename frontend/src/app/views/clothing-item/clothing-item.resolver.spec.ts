import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { ClothingItem } from 'src/app/models/clothing-item.model';
import { ClothesApiService } from 'src/app/shared/services/api-services/clothes-api.service';
import { clothingItemResolver } from './clothing-item.resolver';

describe('clothingItemResolver', () => {
    const executeResolver: ResolveFn<ClothingItem> = (...resolverParameters) =>
        TestBed.runInInjectionContext(() => clothingItemResolver(...resolverParameters));

    let clothingItemServiceSpy: jasmine.SpyObj<ClothesApiService>;

    beforeEach(() => {
        clothingItemServiceSpy = jasmine.createSpyObj('ClothesApiService', ['getClothingItem']);

        TestBed.configureTestingModule({
            providers: [{ provide: ClothesApiService, useValue: clothingItemServiceSpy }],
        });
    });

    it('should be created', () => {
        expect(executeResolver).toBeTruthy();
    });

    it('should try to retrieve the requested clothing item from the clothes API', () => {
        const itemId = '< test item id >';
        executeResolver({ params: { id: itemId } } as any, {} as any);

        expect(clothingItemServiceSpy.getClothingItem).toHaveBeenCalledWith(itemId);
    });
});
