import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WardrobeViewLayoutComponent } from './wardrobe-view-layout.component';

@NgModule({
    declarations: [WardrobeViewLayoutComponent],
    imports: [MatSidenavModule],
    providers: [],
    bootstrap: [],
    exports: [WardrobeViewLayoutComponent],
})
export class WardrobeViewLayoutModule {}
