import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ClothingItemCardModule } from '../../components/clothing-item-card/clothing-item-card.module';
import { ClothingItemModalData } from './clothing-item-modal.service';

@Component({
    selector: 'app-clothing-item-modal',
    templateUrl: './clothing-item-modal.component.html',
    styleUrls: ['./clothing-item-modal.component.scss'],
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, ClothingItemCardModule],
})
export class ClothingItemModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ClothingItemModalData,
        @Inject(MatDialogRef) public dialogRef: MatDialogRef<ClothingItemModalComponent>,
    ) {}

    onEditClicked() {
        throw new Error('Not yet implemented!');
    }

    onDeleteClicked() {
        throw new Error('Not yet implemented!');
    }
}
