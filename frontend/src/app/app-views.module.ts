import { NgModule } from '@angular/core';
import { NotFoundModule } from './views/not-found/not-found.module';
import { WardrobeModule } from './views/wardrobe/wardrobe.module';

@NgModule({
    declarations: [],
    // prettier-ignore
    imports: [
        NotFoundModule,
        WardrobeModule,
    ],
    providers: [],
    bootstrap: [],
})
export class AppViewsModule {}
