import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LOCAL_API_ROOT } from '../../constants/api.constants';
import { BASE_URL_TOKEN } from '../../tokens/base-url.token';
import { ClothesApiService } from './clothes-api.service';

@NgModule({
    declarations: [],
    // prettier-ignore
    providers: [
        ClothesApiService,
        { provide: BASE_URL_TOKEN, useValue: LOCAL_API_ROOT },
    ],
    imports: [HttpClientModule],
    exports: [],
})
export class ApiServicesModule {}
