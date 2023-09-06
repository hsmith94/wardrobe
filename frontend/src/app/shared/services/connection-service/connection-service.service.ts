/**
 * @module ConnectionService
 *      A simplified, Angular Ivy-compatible version of @see https://github.com/ultrasonicsoft/ng-connection-service/tree/main
 */

import { Inject, Injectable, InjectionToken, OnDestroy, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';

/**
 * Instance of this interface is used to report current connection status.
 */
export interface ConnectionState {
    /**
     * "True" if browser has network connection. Determined by Window objects "online" / "offline" events.
     */
    hasNetworkConnection: boolean;
}

/**
 * Instance of this interface could be used to configure "ConnectionService".
 */
export interface ConnectionServiceOptions {}

/**
 * InjectionToken for specifying ConnectionService options.
 */
export const ConnectionServiceOptionsToken = new InjectionToken<ConnectionServiceOptions>(
    'ConnectionServiceOptionsToken',
);

export const DEFAULT_CONNECTION_STATE: ConnectionState = {
    hasNetworkConnection: window.navigator.onLine,
};

export const DEFAULT_OPTIONS: ConnectionServiceOptions = {};

@Injectable({
    providedIn: 'root',
})
export class ConnectionService implements OnDestroy {
    private currentState: ConnectionState = DEFAULT_CONNECTION_STATE;
    private serviceOptions: ConnectionServiceOptions = DEFAULT_OPTIONS;

    private subscription: Subscription = new Subscription();

    private stateChanged$ = new BehaviorSubject<ConnectionState>(DEFAULT_CONNECTION_STATE);

    constructor(@Inject(ConnectionServiceOptionsToken) @Optional() options: ConnectionServiceOptions) {
        // TODO: Token useValue in providers not working.
        this.serviceOptions = { ...DEFAULT_OPTIONS, ...options };
        this.checkNetworkState();
    }

    private checkNetworkState() {
        this.subscription.add(
            fromEvent(window, 'online').subscribe(() => {
                this.currentState.hasNetworkConnection = true;
                this.publishState();
            }),
        );

        this.subscription.add(
            fromEvent(window, 'offline').subscribe(() => {
                this.currentState.hasNetworkConnection = false;
                this.publishState();
            }),
        );
    }
    private publishState() {
        this.stateChanged$.next(this.currentState);
    }

    /**
     * Monitor Network & Internet connection status by subscribing to this observer. If you set "reportCurrentState" to "false" then
     * function will not report current status of the connections when initially subscribed.
     * @param reportCurrentState Report current state when initial subscription. Default is "true"
     */
    public monitor(options?: ConnectionServiceOptions): Observable<ConnectionState> {
        if (options) {
            this.serviceOptions = { ...this.serviceOptions, ...options };
        }
        return this.stateChanged$;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
