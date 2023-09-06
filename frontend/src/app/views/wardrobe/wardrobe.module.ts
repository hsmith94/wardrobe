import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { WardrobeViewLayoutModule } from './wardrobe-view-layout/wardrobe-view-layout.module';
import { WardrobeComponent } from './wardrobe.component';

@NgModule({
    declarations: [WardrobeComponent],
    // prettier-ignore
    imports: [
        MatCardModule,
        RouterModule,
        WardrobeViewLayoutModule,
    ],
    providers: [],
    bootstrap: [],
})
export class WardrobeModule {}
