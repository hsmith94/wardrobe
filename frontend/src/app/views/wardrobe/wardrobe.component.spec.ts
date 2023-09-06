import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ClothesApiService } from 'src/app/shared/services/api-services/clothes-api.service';
import { BreakpointStateService } from 'src/app/shared/services/breakpoint-state/breakpoint-state.service';
import { WardrobeViewLayoutModule } from './wardrobe-view-layout/wardrobe-view-layout.module';
import { WardrobeComponent } from './wardrobe.component';

type BreakpointStateServiceMock = jasmine.SpyObj<BreakpointStateService>;

function makeBreakpointStateServiceMock(): BreakpointStateServiceMock {
    let breakpointStateServiceMock: BreakpointStateServiceMock;
    breakpointStateServiceMock = Object.assign(jasmine.createSpyObj('BreakpointStateService', ['< placeholder >']), {
        isSmallScreen$: of(false),
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

    beforeEach(() => {
        clothesApiServiceMock = jasmine.createSpyObj('ClothesApiService', {
            getAllClothes: of([]),
        });
        breakpointStateServiceMock = makeBreakpointStateServiceMock();

        TestBed.configureTestingModule({
            declarations: [WardrobeComponent],
            imports: [RouterTestingModule, WardrobeViewLayoutModule, MatCardModule, MatGridListModule],
            providers: [
                { provide: ClothesApiService, useValue: clothesApiServiceMock },
                { provide: BreakpointStateService, useValue: breakpointStateServiceMock },
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
