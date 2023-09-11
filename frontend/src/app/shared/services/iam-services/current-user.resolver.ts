import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, take } from 'rxjs';
import { UserInfo } from 'src/app/models/user.model';
import { UserInfoService } from './user-info.service';

export const currentUserResolver: ResolveFn<UserInfo> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    userInfoService = inject(UserInfoService),
): Observable<UserInfo> => {
    const currentUser$ = userInfoService.getCurrentUser$().pipe(take(1));
    return currentUser$;
};
