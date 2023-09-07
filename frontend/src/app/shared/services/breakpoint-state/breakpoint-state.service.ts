import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, distinctUntilChanged } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BreakpointStateService implements OnDestroy {
    public static readonly Breakpoints = {
        Small: [Breakpoints.XSmall, Breakpoints.Small],
        Medium: [Breakpoints.Medium, Breakpoints.Large],
        Large: [Breakpoints.XLarge],
    };

    private isSmallScreen$$ = new BehaviorSubject<boolean>(true); // Small screen by default ("Mobile-first")
    public isSmallScreen$: Observable<boolean> = this.isSmallScreen$$.asObservable().pipe(distinctUntilChanged());

    private isMediumScreen$$ = new BehaviorSubject<boolean>(false);
    public isMediumScreen$: Observable<boolean> = this.isMediumScreen$$.asObservable().pipe(distinctUntilChanged());

    private isLargeScreen$$ = new BehaviorSubject<boolean>(false);
    public isLargeScreen$: Observable<boolean> = this.isLargeScreen$$.asObservable().pipe(distinctUntilChanged());

    private subscriptions: Subscription[] = [];

    constructor(@Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver) {
        this.init();
    }

    private setSmallScreen(): void {
        this.isSmallScreen$$.next(true);
        this.isMediumScreen$$.next(false);
        this.isLargeScreen$$.next(false);
    }

    private setMediumScreen(): void {
        this.isSmallScreen$$.next(false);
        this.isMediumScreen$$.next(true);
        this.isLargeScreen$$.next(false);
    }

    private setLargeScreen(): void {
        this.isSmallScreen$$.next(false);
        this.isMediumScreen$$.next(false);
        this.isLargeScreen$$.next(true);
    }

    private init(): void {
        this.subscriptions.push(
            // Small
            this.breakpointObserver.observe([...BreakpointStateService.Breakpoints.Small]).subscribe((state) => {
                if (state.matches) {
                    this.setSmallScreen();
                }
            }),

            // Medium
            this.breakpointObserver.observe([...BreakpointStateService.Breakpoints.Medium]).subscribe((state) => {
                if (state.matches) {
                    this.setMediumScreen();
                }
            }),

            // Large
            this.breakpointObserver.observe([...BreakpointStateService.Breakpoints.Large]).subscribe((state) => {
                if (state.matches) {
                    this.setLargeScreen();
                }
            }),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
