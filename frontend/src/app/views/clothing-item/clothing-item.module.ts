import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ClothingItemCardModule } from 'src/app/shared/components/clothing-item-card/clothing-item-card.module';
import { ClothingItemComponent } from './clothing-item.component';

@NgModule({
    declarations: [ClothingItemComponent],
    imports: [ClothingItemCardModule, MatButtonModule],
    providers: [],
    bootstrap: [],
    exports: [ClothingItemComponent],
})
export class ClothingItemModule {}
