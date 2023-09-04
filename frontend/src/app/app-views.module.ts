import { NgModule } from '@angular/core';
import { ClothingItemModule } from './views/clothing-item/clothing-item.module';
import { NotFoundModule } from './views/not-found/not-found.module';
import { WardrobeModule } from './views/wardrobe/wardrobe.module';

@NgModule({
    declarations: [],
    // prettier-ignore
    imports: [
        ClothingItemModule,
        NotFoundModule,
        WardrobeModule,
    ],
    providers: [],
    bootstrap: [],
})
export class AppViewsModule {}
