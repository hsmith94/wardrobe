import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppViewsModule } from './app-views.module';
import { AppComponent } from './app.component';
import { MainToolbarModule } from './shared/components/main-toolbar/main-toolbar.module';
import { ApiServicesModule } from './shared/services/api-services/api-services.module';
import { BASE_URL_TOKEN } from './shared/tokens/base-url.token';

@NgModule({
    declarations: [AppComponent],
    // prettier-ignore
    imports: [
        ApiServicesModule,
        AppRoutingModule,
        AppViewsModule,
        BrowserAnimationsModule,
        BrowserModule,
        MainToolbarModule,
    ],
    providers: [{ provide: BASE_URL_TOKEN, useValue: 'http://localhost:3000/api/v1/' }], // TODO: Get this from environment (to enable production).
    bootstrap: [AppComponent],
})
export class AppModule {}
