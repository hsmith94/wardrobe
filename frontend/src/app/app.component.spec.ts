import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MainToolbarModule } from './shared/components/main-toolbar/main-toolbar.module';
import { NotConnectedModule } from './shared/components/not-connected/not-connected.module';
import { ConnectionServiceTestHarness } from './shared/services/connection-service/connection-service.harness';
import { ConnectionService } from './shared/services/connection-service/connection-service.service';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule, MainToolbarModule, NotConnectedModule],
            providers: [ConnectionService, { provide: MatSnackBar, useValue: snackBarSpy }],
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle a network disconnection', () => {
        ConnectionServiceTestHarness.disconnect();
        fixture.detectChanges();

        const notConnectedComponentDe = fixture.debugElement.query(
            By.css(AppComponent.Selectors.NotConnectedComponent),
        );

        expect(notConnectedComponentDe).toBeTruthy();
        expect(snackBarSpy.open).not.toHaveBeenCalled();
    });

    it('should handle a network re-connection', () => {
        ConnectionServiceTestHarness.disconnect();
        fixture.detectChanges();

        ConnectionServiceTestHarness.connect();
        fixture.detectChanges();

        const notConnectedComponentDe = fixture.debugElement.query(
            By.css(AppComponent.Selectors.NotConnectedComponent),
        );

        expect(notConnectedComponentDe).toBeFalsy();
        expect(snackBarSpy.open).toHaveBeenCalled();
    });
});
