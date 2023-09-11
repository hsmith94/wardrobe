import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingItemCardModule } from 'src/app/shared/components/clothing-item-card/clothing-item-card.module';
import { ClothingItemComponent } from './clothing-item.component';

describe('ClothingItemComponent', () => {
    let component: ClothingItemComponent;
    let fixture: ComponentFixture<ClothingItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ClothingItemComponent],
            imports: [ClothingItemCardModule],
        });
        fixture = TestBed.createComponent(ClothingItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
