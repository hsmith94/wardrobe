import { JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ClothingItemComponent } from './clothing-item.component';

@NgModule({
    declarations: [ClothingItemComponent],
    imports: [JsonPipe, MatDialogModule],
    providers: [],
    bootstrap: [],
    exports: [ClothingItemComponent],
})
export class ClothingItemModule {}
