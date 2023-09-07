import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CLOTHING_ITEM_ID_QUERY_PARAM_KEY } from 'src/app/app-routing.module';
import { ClothingItem, ClothingItemId } from 'src/app/models/clothing-item.model';
import { DEFAULT_SNACK_BAR_DURATION } from 'src/app/shared/constants/snack-bar.constants';
import { ClothesApiService } from 'src/app/shared/services/api-services/clothes-api.service';
import { BreakpointStateService } from 'src/app/shared/services/breakpoint-state/breakpoint-state.service';
import { ClothingItemModalService } from '../clothing-item/clothing-item-modal/clothing-item-modal.service';

namespace ClothesUtils {
    export function findItem(clothes: ClothingItem[], itemId: ClothingItemId): ClothingItem | undefined {
        const clothingItem = clothes.find((clothingItem: ClothingItem) => clothingItem.itemId === itemId);
        if (clothingItem) {
            return clothingItem;
        } else {
            return undefined;
        }
    }
}

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
        @Inject(ActivatedRoute) private route: ActivatedRoute,
        @Inject(BreakpointStateService) private breakpointState: BreakpointStateService,
        @Inject(ClothesApiService) private clothesApi: ClothesApiService,
        @Inject(ClothingItemModalService) private clothingItemModal: ClothingItemModalService,
        @Inject(MatSnackBar) private snackBar: MatSnackBar,
        @Inject(Router) private router: Router,
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

    private removeQueryParams() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    private findItem(itemId: ClothingItemId): ClothingItem | undefined {
        return ClothesUtils.findItem(this.clothes, itemId);
    }

    private showItemNotFound(itemId: ClothingItemId): void {
        this.snackBar.open(`No clothing item matches ${itemId}`, undefined, {
            duration: DEFAULT_SNACK_BAR_DURATION,
        });
    }

    private handleItemNotFound(itemId: ClothingItemId): void {
        this.showItemNotFound(itemId);
        this.removeQueryParams();
    }

    private showItem(itemId: ClothingItemId): void {
        const clothingItem = this.findItem(itemId);
        if (clothingItem) {
            this.clothingItemModal.show({ clothingItem });
        } else {
            this.handleItemNotFound(itemId);
        }
    }

    private initParamsChange(): void {
        this.subscriptions.push(
            this.route.queryParams.subscribe((params) => {
                const itemId = params[CLOTHING_ITEM_ID_QUERY_PARAM_KEY];
                if (itemId) {
                    this.showItem(itemId);
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
        this.initParamsChange();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
