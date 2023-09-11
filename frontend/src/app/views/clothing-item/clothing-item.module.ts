import { NgModule } from '@angular/core';
import { ClothingItemCardModule } from 'src/app/shared/components/clothing-item-card/clothing-item-card.module';
import { ClothingItemComponent } from './clothing-item.component';

@NgModule({
    declarations: [ClothingItemComponent],
    imports: [ClothingItemCardModule],
    providers: [],
    bootstrap: [],
    exports: [ClothingItemComponent],
})
export class ClothingItemModule {}
