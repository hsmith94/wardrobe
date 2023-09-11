import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, map, throwError } from 'rxjs';
import { UserInfo } from 'src/app/models/user.model';
import { CurrentUserApiService } from '../api-services/current-user-api.service';

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {
    private currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);

    constructor(@Inject(CurrentUserApiService) private currentUserApiService: CurrentUserApiService) {
        this._lookupCurrentUser();
    }

    private _setCurrentUserError(err: Error): void {
        console.error(err);
        this.currentUser$.error(err);
    }

    private _setCurrentUser(currentUser: UserInfo): void {
        this.currentUser$.next(currentUser);
    }

    private _lookupCurrentUser(): void {
        this.currentUserApiService
            .getCurrentUser()
            .pipe(
                catchError((err: Error, caught: Observable<UserInfo>) => {
                    this._setCurrentUserError(err);
                    return throwError(() => err);
                }),
            )
            .subscribe((currentUser: UserInfo) => {
                this._setCurrentUser(currentUser);
            });
    }

    getCurrentUser$(): Observable<UserInfo> {
        return this.currentUser$.pipe(
            filter((currentUser: UserInfo | undefined) => currentUser !== undefined),
            map((currentUser: UserInfo | undefined) => currentUser as UserInfo), // ← Type coercion only
        );
    }
}
