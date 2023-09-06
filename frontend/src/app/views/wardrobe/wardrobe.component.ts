import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClothingItem } from 'src/app/models/clothing-item.model';
import { ClothesApiService } from 'src/app/shared/services/api-services/clothes-api.service';
import { BreakpointStateService } from 'src/app/shared/services/breakpoint-state/breakpoint-state.service';

type GridListConfig = {
    cols: number;
};

enum GridListConfigValues {
    MobileCols = 1,
    DesktopCols = 3,
}

const DEFAULT_GRID_LIST_CONFIG: GridListConfig = {
    cols: GridListConfigValues.MobileCols,
};

@Component({
    selector: 'app-wardrobe',
    templateUrl: './wardrobe.component.html',
    styleUrls: ['./wardrobe.component.scss'],
})
export class WardrobeComponent implements OnInit, OnDestroy {
    public clothes: ClothingItem[] = [];

    public readonly gridListConfig: GridListConfig = { ...DEFAULT_GRID_LIST_CONFIG };

    private readonly subscriptions: Subscription[] = [];

    constructor(
        @Inject(ClothesApiService) private clothesApi: ClothesApiService,
        @Inject(BreakpointStateService) private breakpointState: BreakpointStateService,
    ) {}

    private initBreakpoints() {
        this.subscriptions.push(
            this.breakpointState.isSmallScreen$.subscribe((isSmallScreen) => {
                if (isSmallScreen) {
                    this.gridListConfig.cols = GridListConfigValues.MobileCols;
                }
            }),
            this.breakpointState.isMediumScreen$.subscribe((isMediumScreen) => {
                if (isMediumScreen) {
                    this.gridListConfig.cols = GridListConfigValues.DesktopCols;
                }
            }),
            this.breakpointState.isLargeScreen$.subscribe((isLargeScreen) => {
                if (isLargeScreen) {
                    this.gridListConfig.cols = GridListConfigValues.DesktopCols;
                }
            }),
        );
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.clothesApi.getAllClothes().subscribe((allClothes) => {
                this.clothes = allClothes;
            }),
        );
        this.initBreakpoints();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
