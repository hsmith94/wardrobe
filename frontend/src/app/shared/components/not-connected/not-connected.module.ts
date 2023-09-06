import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NotConnectedComponent } from './not-connected.component';

@NgModule({
    declarations: [NotConnectedComponent],
    imports: [MatIconModule],
    exports: [NotConnectedComponent],
})
export class NotConnectedModule {}
