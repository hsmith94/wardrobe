import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { WardrobeViewLayoutComponent } from './wardrobe-view-layout.component';

@NgModule({
    declarations: [WardrobeViewLayoutComponent],
    imports: [RouterModule, MatSidenavModule],
    providers: [],
    bootstrap: [],
    exports: [WardrobeViewLayoutComponent],
})
export class WardrobeViewLayoutModule {}
