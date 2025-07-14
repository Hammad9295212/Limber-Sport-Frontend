import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainPageService {
    apiUrl = "https://admin-dev.limbersport.net";
    getPlayUrl = `${this.apiUrl}/api/v1/play-list`;
    getRolesUrl = `${this.apiUrl}/api/v1/roles-list`;

    constructor(private http: HttpClient) { }

    getPlayData(): Observable<any> {
        return this.http.get<any>(this.getPlayUrl);
    }
    getRolesData(): Observable<any> {
        return this.http.get<any>(this.getRolesUrl);
    }

    onGet(endpoint: any, params: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/' + endpoint, {params});
    }

  onGetUsingToken(endpoint: string, params: any, token: any): Observable<any> {
    let headers: any = new HttpHeaders({ 'Accept': '*/*' });
    if (token) {
      headers = headers.append('authorization', `Bearer ${token}`);
      headers = headers.append('X-CSRF-TOKEN', '');
    }
    return this.http.get<any>(this.apiUrl + '/' + endpoint, { headers, params });
  }

  onPostUsingToken(endpoint: string, data: any, token: any): Observable<any> {
    let headers: any = new HttpHeaders({ 'Accept': '*/*' });

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
      headers = headers.append('X-CSRF-TOKEN', '');
    }

    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, { headers });
  }

}
