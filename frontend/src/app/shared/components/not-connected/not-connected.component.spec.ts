import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotConnectedComponent } from './not-connected.component';

describe('NotConnectedComponent', () => {
    let component: NotConnectedComponent;
    let fixture: ComponentFixture<NotConnectedComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NotConnectedComponent],
        });
        fixture = TestBed.createComponent(NotConnectedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show a message explaining the connection has been lost', () => {
        const compiled = fixture.nativeElement;
        const primaryMessageDe = compiled.querySelector(NotConnectedComponent.Selectors.PrimaryMessage);
        expect(primaryMessageDe.textContent).toContain('Lost internet connection');
    });
});
