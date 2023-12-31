import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WardrobeViewLayoutComponent } from './wardrobe-view-layout.component';

describe('WardrobeViewLayoutComponent', () => {
    let component: WardrobeViewLayoutComponent;
    let fixture: ComponentFixture<WardrobeViewLayoutComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WardrobeViewLayoutComponent],
            imports: [MatSidenavModule, NoopAnimationsModule],
        });
        fixture = TestBed.createComponent(WardrobeViewLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
