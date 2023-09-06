import { Component, Inject, OnInit } from '@angular/core';
import { ClothingItem } from 'src/app/models/clothing-item.model';
import { ClothesApiService } from 'src/app/shared/services/api-services/clothes-api.service';

@Component({
    selector: 'app-wardrobe',
    templateUrl: './wardrobe.component.html',
    styleUrls: ['./wardrobe.component.scss'],
})
export class WardrobeComponent implements OnInit {
    clothes: ClothingItem[] = [];

    constructor(@Inject(ClothesApiService) private clothesApi: ClothesApiService) {}

    ngOnInit(): void {
        this.clothesApi.getAllClothes().subscribe((allClothes) => {
            this.clothes = allClothes;
        });
    }
}
