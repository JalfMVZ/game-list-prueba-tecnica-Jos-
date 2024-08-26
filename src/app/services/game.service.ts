import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from 'src/interfaces/game.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = `${environment.apiUrl}/games`;
  private gameApiUrl = `${environment.apiUrl}/game`;

  constructor(private http: HttpClient) {}

  getGames(params: any = {}): Observable<Game[]> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<Game[]>(this.apiUrl, { params: httpParams });
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.gameApiUrl}?id=${id}`);
  }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }
}
