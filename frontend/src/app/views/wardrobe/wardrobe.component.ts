import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CLOTHING_ITEM_ID_QUERY_PARAM_KEY } from 'src/app/app-routing.module';
import { ClothingItem, ClothingItemId } from 'src/app/models/clothing-item.model';
import { UserInfo } from 'src/app/models/user.model';
import { ClothingItemCardModule } from 'src/app/shared/components/clothing-item-card/clothing-item-card.module';
import { DEFAULT_SNACK_BAR_DURATION } from 'src/app/shared/constants/snack-bar.constants';
import { ClothingItemModalModule } from 'src/app/shared/modals/clothing-item-modal/clothing-item-modal.module';
import { BreakpointStateModule } from 'src/app/shared/services/breakpoint-state/breakpoint-state.module';
import { BreakpointStateService } from 'src/app/shared/services/breakpoint-state/breakpoint-state.service';
import { ClothingItemModalService } from '../../shared/modals/clothing-item-modal/clothing-item-modal.service';
import { WardrobeViewLayoutModule } from './wardrobe-view-layout/wardrobe-view-layout.module';

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
    standalone: true,
    imports: [
        BreakpointStateModule,
        ClothingItemCardModule,
        ClothingItemModalModule,
        CommonModule,
        CommonModule,
        MatCardModule,
        MatGridListModule,
        RouterModule,
        WardrobeViewLayoutModule,
    ],
})
export class WardrobeComponent implements OnInit, OnDestroy {
    @Input('currentUser') public readonly currentUser!: UserInfo;
    @Input('clothes') public readonly clothes!: ClothingItem[];

    public readonly gridListConfig: GridListConfig = { ...DEFAULT_GRID_LIST_CONFIG };

    private readonly subscriptions: Subscription[] = [];

    constructor(
        @Inject(ActivatedRoute) private route: ActivatedRoute,
        @Inject(BreakpointStateService) private breakpointState: BreakpointStateService,
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

    private removeQueryParams(): void {
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

    private _showItem(clothingItem: ClothingItem): void {
        const afterDismissed$ = this.clothingItemModal.show({ clothingItem });

        const sub = afterDismissed$.subscribe(() => {
            this.removeQueryParams();
            sub.unsubscribe();
        });
    }

    private showItem(itemId: ClothingItemId): void {
        const clothingItem = this.findItem(itemId);
        if (clothingItem) {
            this._showItem(clothingItem);
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
        this.initBreakpoints();
        this.initParamsChange();
        console.log('currentUser', this.currentUser);
        console.log('clothes', this.clothes);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
