import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainToolbarComponent } from './main-toolbar.component';

@NgModule({
    declarations: [MainToolbarComponent],
    imports: [MatToolbarModule, MatButtonModule, MatIconModule],
    exports: [MainToolbarComponent],
})
export class MainToolbarModule {}
