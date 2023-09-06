import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { WardrobeViewLayoutModule } from './wardrobe-view-layout/wardrobe-view-layout.module';
import { WardrobeComponent } from './wardrobe.component';

describe('WardrobeComponent', () => {
    let component: WardrobeComponent;
    let fixture: ComponentFixture<WardrobeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WardrobeComponent],
            imports: [RouterTestingModule, WardrobeViewLayoutModule, MatCardModule],
        });
        fixture = TestBed.createComponent(WardrobeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
