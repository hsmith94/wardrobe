import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/user.model';
import { BASE_URL_TOKEN } from '../../tokens/base-url.token';
import { makeUrl } from './make-url.util';

@Injectable({
    providedIn: 'root',
})
export class CurrentUserApiService {
    // prettier-ignore
    constructor(
        @Inject(BASE_URL_TOKEN) private readonly BASE_URL: string,
        @Inject(HttpClient) private http: HttpClient,
    ) {}
    private makeUrl(...parts: string[]): string {
        return makeUrl(this.BASE_URL, ...parts);
    }
    getCurrentUser(): Observable<UserInfo> {
        return this.http.get<UserInfo>(this.makeUrl('current-user'));
    }
}
