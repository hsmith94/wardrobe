import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DEFAULT_SNACK_BAR_DURATION } from './shared/constants/snack-bar.constants';
import { ConnectionService } from './shared/services/connection-service/connection-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    static Selectors = {
        NotConnectedComponent: '#app-not-connected',
    };

    title = 'Wardrobe';

    isConnected!: boolean;

    subscriptions: Subscription[] = [];

    constructor(
        @Inject(ConnectionService) private connectionService: ConnectionService,
        @Inject(MatSnackBar) private snackBar: MatSnackBar,
    ) {}

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    private setIsConnected(isConnected: boolean): void {
        const pastState = this.isConnected;
        this.isConnected = isConnected;

        const newState = isConnected;
        if (pastState === false && newState === true) {
            this.snackBar.open('Reconnected to the internet!', undefined, { duration: DEFAULT_SNACK_BAR_DURATION });
        }
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.connectionService.monitor().subscribe((connectionState) => {
                this.setIsConnected(connectionState.hasNetworkConnection);
            }),
        );
    }
}
