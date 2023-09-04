import { JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClothingItemComponent } from './clothing-item.component';

@NgModule({
    declarations: [ClothingItemComponent],
    imports: [JsonPipe],
    providers: [],
    bootstrap: [],
})
export class ClothingItemModule {}
