import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClothingItemModule } from '../clothing-item.module';
import { ClothingItemModalData } from './clothing-item-modal.service';

@Component({
    selector: 'app-clothing-item-modal',
    template: '<app-clothing-item [item]="data.item"></app-clothing-item>',
    standalone: true,
    imports: [ClothingItemModule],
})
export class ClothingItemModalComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ClothingItemModalData) {}
}
