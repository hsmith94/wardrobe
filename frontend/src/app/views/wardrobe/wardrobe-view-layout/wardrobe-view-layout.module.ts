import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WardrobeViewLayoutComponent } from './wardrobe-view-layout.component';

@NgModule({
    declarations: [WardrobeViewLayoutComponent],
    imports: [BrowserAnimationsModule, MatSidenavModule],
    providers: [],
    bootstrap: [],
    exports: [WardrobeViewLayoutComponent],
})
export class WardrobeViewLayoutModule {}
