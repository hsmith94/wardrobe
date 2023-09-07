import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { BreakpointStateService } from 'src/app/shared/services/breakpoint-state/breakpoint-state.service';

@Component({
    selector: 'app-wardrobe-view-layout',
    templateUrl: './wardrobe-view-layout.component.html',
    styleUrls: ['./wardrobe-view-layout.component.scss'],
})
export class WardrobeViewLayoutComponent implements OnInit, OnDestroy {
    public isUiSideBySide: boolean = false;
    public isSidenavOpen: boolean = false;

    private readonly subscriptions: Subscription[] = [];

    constructor(@Inject(BreakpointStateService) private breakpointState: BreakpointStateService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            forkJoin([this.breakpointState.isMediumScreen$, this.breakpointState.isLargeScreen$]).subscribe(
                ([isMediumScreen, isLargeScreen]) => {
                    if (isMediumScreen || isLargeScreen) {
                        this.isUiSideBySide = true;
                        this.isSidenavOpen = true;
                    } else {
                        this.isUiSideBySide = false;
                        this.isSidenavOpen = false;
                    }
                },
            ),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
