import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ClothesApiService } from 'src/app/shared/services/api-services/clothes-api.service';
import { BreakpointStateService } from 'src/app/shared/services/breakpoint-state/breakpoint-state.service';
import { ClothingItemModalService } from '../../shared/modals/clothing-item-modal/clothing-item-modal.service';
import { WardrobeViewLayoutModule } from './wardrobe-view-layout/wardrobe-view-layout.module';
import { WardrobeComponent } from './wardrobe.component';

type BreakpointStateServiceMock = jasmine.SpyObj<BreakpointStateService>;

function makeBreakpointStateServiceMock(): BreakpointStateServiceMock {
    let breakpointStateServiceMock: BreakpointStateServiceMock;
    breakpointStateServiceMock = Object.assign(jasmine.createSpyObj('BreakpointStateService', ['< placeholder >']), {
        isSmallScreen$: of(true),
        isMediumScreen$: of(false),
        isLargeScreen$: of(false),
    });
    return breakpointStateServiceMock;
}

describe('WardrobeComponent', () => {
    let component: WardrobeComponent;
    let fixture: ComponentFixture<WardrobeComponent>;

    let clothesApiServiceMock: jasmine.SpyObj<ClothesApiService>;
    let breakpointStateServiceMock: jasmine.SpyObj<BreakpointStateService>;
    let clothingItemModalServiceMock: jasmine.SpyObj<ClothingItemModalService>;
    let matSnackBarMock: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        clothesApiServiceMock = jasmine.createSpyObj('ClothesApiService', {
            getAllClothes: of([]),
        });
        clothingItemModalServiceMock = jasmine.createSpyObj('ClothingItemModalService', {
            show: of(undefined),
        });
        matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
        breakpointStateServiceMock = makeBreakpointStateServiceMock();

        TestBed.configureTestingModule({
            declarations: [WardrobeComponent],
            // prettier-ignore
            imports: [
                CommonModule,
                MatCardModule,
                MatGridListModule,
                RouterTestingModule,
                WardrobeViewLayoutModule,
            ],
            providers: [
                { provide: BreakpointStateService, useValue: breakpointStateServiceMock },
                { provide: ClothesApiService, useValue: clothesApiServiceMock },
                { provide: ClothingItemModalService, useValue: clothingItemModalServiceMock },
                { provide: MatSnackBar, useValue: matSnackBarMock },
            ],
        });

        fixture = TestBed.createComponent(WardrobeComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
