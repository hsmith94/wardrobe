import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClothingItem, ClothingItemId } from 'src/app/models/clothing-item.model';

@Component({
    selector: 'app-clothing-item',
    templateUrl: './clothing-item.component.html',
    styleUrls: ['./clothing-item.component.scss'],
})
export class ClothingItemComponent {
    @Input('id') itemId!: ClothingItemId;
    @Input() item!: ClothingItem;

    @Output() editClicked = new EventEmitter<void>();
    @Output() deleteClicked = new EventEmitter<void>();

    onEditClicked(): void {
        this.editClicked.emit();
    }

    onDeleteClicked(): void {
        this.deleteClicked.emit();
    }
}
