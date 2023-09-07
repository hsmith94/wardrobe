import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { ClothingItemCardModule } from 'src/app/shared/components/clothing-item-card/clothing-item-card.module';
import { BreakpointStateModule } from 'src/app/shared/services/breakpoint-state/breakpoint-state.module';
import { ClothingItemModalModule } from '../clothing-item/clothing-item-modal/clothing-item-modal.module';
import { ClothingItemModule } from '../clothing-item/clothing-item.module';
import { WardrobeViewLayoutModule } from './wardrobe-view-layout/wardrobe-view-layout.module';
import { WardrobeComponent } from './wardrobe.component';

@NgModule({
    declarations: [WardrobeComponent],
    // prettier-ignore
    imports: [
        BreakpointStateModule,
        ClothingItemCardModule,
        ClothingItemModalModule,
        ClothingItemModule,
        CommonModule,
        MatCardModule,
        MatGridListModule,
        RouterModule,
        WardrobeViewLayoutModule,
    ],
    providers: [],
    bootstrap: [],
})
export class WardrobeModule {}
