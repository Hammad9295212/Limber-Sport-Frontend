import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {
    apiUrl = "https://admin-dev.limbersport.net";
    logoutURL = `${this.apiUrl}/api/auth/logout`;

    constructor(private http: HttpClient) { }

    logoutUser(): Observable<any> {
        return this.http.post<any>(this.logoutURL, {});
    }
}
