import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-wardrobe-view-layout',
    templateUrl: './wardrobe-view-layout.component.html',
    styleUrls: ['./wardrobe-view-layout.component.scss'],
})
export class WardrobeViewLayoutComponent implements OnInit, OnDestroy {
    public isUiSideBySide: boolean = false;
    public isSidenavOpen: boolean = false;

    private readonly subscriptions: Subscription[] = [];

    constructor(@Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.breakpointObserver
                .observe([
                    // Breakpoints.XSmall,
                    // Breakpoints.Small,
                    Breakpoints.Medium,
                    Breakpoints.Large,
                    Breakpoints.XLarge,
                ])
                .subscribe((state: BreakpointState) => {
                    if (state.matches) {
                        this.isUiSideBySide = true;
                        this.isSidenavOpen = true;
                    } else {
                        this.isUiSideBySide = false;
                        this.isSidenavOpen = false;
                    }
                }),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
