import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ClothingItemCardComponent } from './clothing-item-card.component';

@NgModule({
    declarations: [ClothingItemCardComponent],
    // prettier-ignore
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule,
    ],
    providers: [],
    bootstrap: [],
    exports: [ClothingItemCardComponent],
})
export class ClothingItemCardModule {}
