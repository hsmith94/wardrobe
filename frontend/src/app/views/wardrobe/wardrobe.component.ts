import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClothingItem } from 'src/app/models/clothing-item.model';
import { ClothesApiService } from 'src/app/shared/services/api-services/clothes-api.service';

type GridListConfig = {
    cols: number;
};

enum GridListConfigValues {
    MobileCols = 1,
    LargeScreenCols = 3,
}

@Component({
    selector: 'app-wardrobe',
    templateUrl: './wardrobe.component.html',
    styleUrls: ['./wardrobe.component.scss'],
})
export class WardrobeComponent implements OnInit, OnDestroy {
    public clothes: ClothingItem[] = [];

    public readonly gridListConfig: GridListConfig = {
        cols: GridListConfigValues.MobileCols,
    };

    private readonly subscriptions: Subscription[] = [];

    constructor(
        @Inject(ClothesApiService) private clothesApi: ClothesApiService,
        @Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver,
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.clothesApi.getAllClothes().subscribe((allClothes) => {
                this.clothes = allClothes;
            }),
            this.breakpointObserver
                .observe([
                    // Breakpoints.XSmall,
                    // Breakpoints.Small,
                    Breakpoints.Medium,
                    Breakpoints.Large,
                    Breakpoints.XLarge,
                ])
                .subscribe((state) => {
                    if (state.matches) {
                        this.gridListConfig.cols = GridListConfigValues.LargeScreenCols;
                    } else {
                        this.gridListConfig.cols = GridListConfigValues.MobileCols;
                    }
                }),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
