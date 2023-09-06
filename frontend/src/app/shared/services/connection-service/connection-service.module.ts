import { NgModule } from '@angular/core';
import { ConnectionService } from './connection-service.service';

/** A shim module to make the `ng-connection-service` library compatible with Angular Ivy. */
@NgModule({
    declarations: [],
    imports: [],
    providers: [ConnectionService],
    bootstrap: [],
})
export class ConnectionServiceModule {}
