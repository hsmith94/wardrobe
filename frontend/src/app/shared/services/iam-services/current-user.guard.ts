import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, of, take } from 'rxjs';
import { UserInfoService } from 'src/app/shared/services/iam-services/user-info.service';

export const currentUserCanActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    userInfoService = inject(UserInfoService),
    router = inject(Router),
) => {
    const currentUserCanActivate$ = userInfoService.getCurrentUser$().pipe(
        take(1),
        map(() => true),
        catchError(() => {
            router.navigate(['not-found']);
            return of(false);
        }),
    );
    return currentUserCanActivate$;
};
