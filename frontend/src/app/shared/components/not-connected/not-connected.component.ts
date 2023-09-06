import { Component } from '@angular/core';

@Component({
    selector: 'app-not-connected',
    templateUrl: './not-connected.component.html',
    styleUrls: ['./not-connected.component.scss'],
})
export class NotConnectedComponent {
    static Selectors = {
        PrimaryMessage: 'h2.lost-connection-message',
    };
}
