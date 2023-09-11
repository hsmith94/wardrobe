import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ClothingItemModalComponent } from './clothing-item-modal.component';
import { ClothingItemModalService } from './clothing-item-modal.service';

@NgModule({
    declarations: [],
    imports: [ClothingItemModalComponent, MatDialogModule],
    providers: [ClothingItemModalService],
    bootstrap: [],
    exports: [],
})
export class ClothingItemModalModule {}
