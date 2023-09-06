import { Component, Input } from '@angular/core';
import { ClothingItem } from 'src/app/models/clothing-item.model';

@Component({
    selector: 'app-clothing-item-card',
    templateUrl: './clothing-item-card.component.html',
    styleUrls: ['./clothing-item-card.component.scss'],
})
export class ClothingItemCardComponent {
    @Input() clothingItem!: ClothingItem;
}
