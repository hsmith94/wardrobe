import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ClothingItemModalService } from './clothing-item-modal.service';

@NgModule({
    declarations: [],
    imports: [MatDialogModule],
    providers: [ClothingItemModalService],
    bootstrap: [],
    exports: [],
})
export class ClothingItemModalModule {}
