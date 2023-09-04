import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppViewsModule } from './app-views.module';
import { AppComponent } from './app.component';
import { MainToolbarModule } from './shared/components/main-toolbar/main-toolbar.module';

@NgModule({
    declarations: [AppComponent],
    // prettier-ignore
    imports: [
        AppRoutingModule,
        AppViewsModule,
        BrowserAnimationsModule,
        BrowserModule,
        MainToolbarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
