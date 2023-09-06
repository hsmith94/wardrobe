import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppViewsModule } from './app-views.module';
import { AppComponent } from './app.component';
import { MainToolbarModule } from './shared/components/main-toolbar/main-toolbar.module';
import { NotConnectedModule } from './shared/components/not-connected/not-connected.module';
import { ApiServicesModule } from './shared/services/api-services/api-services.module';
import { ConnectionServiceModule } from './shared/services/connection-service/connection-service.module';

@NgModule({
    declarations: [AppComponent],
    // prettier-ignore
    imports: [
        ApiServicesModule,
        AppRoutingModule,
        AppViewsModule,
        BrowserAnimationsModule,
        BrowserModule,
        ConnectionServiceModule,
        MainToolbarModule,
        MatSnackBarModule,
        NotConnectedModule,
    ],
    providers: [], // TODO: Get this from environment (to enable production).
    bootstrap: [AppComponent],
})
export class AppModule {}
