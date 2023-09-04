import { Component, Input } from '@angular/core';
import { ClothingItem, ClothingItemId } from 'src/app/models/clothing-item.model';

@Component({
    selector: 'app-clothing-item',
    templateUrl: './clothing-item.component.html',
    styleUrls: ['./clothing-item.component.scss'],
})
export class ClothingItemComponent {
    @Input('id') itemId!: ClothingItemId;
    @Input() item!: ClothingItem;
}
