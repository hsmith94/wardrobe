import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { NotConnectedComponent } from './not-connected.component';

describe('NotConnectedComponent', () => {
    let component: NotConnectedComponent;
    let fixture: ComponentFixture<NotConnectedComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NotConnectedComponent],
            imports: [MatIconModule],
        });
        fixture = TestBed.createComponent(NotConnectedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show a message explaining the connection has been lost', () => {
        const primaryMessageDe: DebugElement = fixture.debugElement.query(
            By.css(NotConnectedComponent.Selectors.PrimaryMessage),
        );
        expect(primaryMessageDe.nativeElement.textContent).toContain('Lost internet connection');
    });
});
