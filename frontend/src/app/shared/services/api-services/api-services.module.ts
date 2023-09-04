import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ClothesApiService } from './clothes-api.service';

@NgModule({
    declarations: [],
    // prettier-ignore
    providers: [
        ClothesApiService,
    ],
    imports: [HttpClientModule],
    exports: [],
})
export class ApiServicesModule {}
