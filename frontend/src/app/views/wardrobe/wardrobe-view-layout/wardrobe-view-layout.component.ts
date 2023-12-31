import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
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

    setDesktop(): void {
        this.isUiSideBySide = true;
        this.isSidenavOpen = true;
    }

    setMobile(): void {
        this.isUiSideBySide = false;
        this.isSidenavOpen = false;
    }

    ngOnInit(): void {
        this.subscriptions.push(
            combineLatest([this.breakpointState.isMediumScreen$, this.breakpointState.isLargeScreen$]).subscribe(
                ([isMediumScreen, isLargeScreen]) => {
                    if (isMediumScreen || isLargeScreen) {
                        this.setDesktop();
                    } else {
                        this.setMobile();
                    }
                },
            ),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
