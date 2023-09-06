import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MainToolbarComponent } from './main-toolbar.component';

@NgModule({
    declarations: [MainToolbarComponent],
    // prettier-ignore
    imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        RouterModule,
    ],
    exports: [MainToolbarComponent],
})
export class MainToolbarModule {}
