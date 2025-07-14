import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalPlayersService {
    apiUrl = "https://admin-dev.limbersport.net";
    getPlayerUrl = `${this.apiUrl}/api/v1/player-list?limit=4`;

    constructor(private http: HttpClient) { }

    getPlayerData(): Observable<any> {
        return this.http.get<any>(this.getPlayerUrl);
    }
}

