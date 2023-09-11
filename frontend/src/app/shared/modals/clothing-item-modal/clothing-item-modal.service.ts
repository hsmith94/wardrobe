import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { ClothingItem } from 'src/app/models/clothing-item.model';
import { ClothingItemModalComponent } from './clothing-item-modal.component';

export type ClothingItemModalData = {
    itemId: string;
    item: ClothingItem;
};

@Injectable({
    providedIn: 'root',
})
export class ClothingItemModalService implements OnDestroy {
    private currentDialogRef?: MatDialogRef<ClothingItemModalComponent, any>;

    get isShowing(): boolean {
        return !!this.currentDialogRef;
    }

    constructor(@Inject(MatDialog) private dialog: MatDialog) {}

    private closeModal(): void {
        if (this.currentDialogRef) {
            this.currentDialogRef.close();
        }
    }

    private openModal<TResult>(data: ClothingItemModalData): MatDialogRef<ClothingItemModalComponent, TResult> {
        const dialogRef = this.dialog.open(ClothingItemModalComponent, { data });
        return dialogRef;
    }

    public show<TResult = any>(options: { clothingItem: ClothingItem }): Observable<TResult> {
        if (this.isShowing) {
            this.closeModal();
        }

        const dialogRef = this.openModal({
            itemId: options.clothingItem.itemId,
            item: options.clothingItem,
        });

        const afterClosed$ = dialogRef.afterClosed().pipe(
            tap(() => {
                this.currentDialogRef = undefined;
            }),
        );

        afterClosed$.subscribe(); // Ensure pipe is executed

        this.currentDialogRef = dialogRef;

        return afterClosed$ as Observable<TResult>;
    }

    ngOnDestroy(): void {
        if (this.isShowing) {
            this.closeModal();
        }
    }
}
