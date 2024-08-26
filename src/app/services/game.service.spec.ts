import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GameService } from './game.service';
import { Game } from 'src/interfaces/game.interface';
import { environment } from '../../environments/environment';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService],
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve games from the API via GET', () => {
    const dummyGames: Game[] = [
      { id: 1, title: 'Game 1', thumbnail: 'img1.jpg', short_description: 'Desc 1', genre: 'Action', platform: 'PC' },
      { id: 2, title: 'Game 2', thumbnail: 'img2.jpg', short_description: 'Desc 2', genre: 'Adventure', platform: 'Browser' },
    ];

    service.getGames().subscribe(games => {
      expect(games.length).toBe(2);
      expect(games).toEqual(dummyGames);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/games`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGames);
  });

  it('should retrieve a specific game by ID from the API via GET', () => {
    const dummyGame: Game = { id: 1, title: 'Game 1', thumbnail: 'img1.jpg', short_description: 'Desc 1', genre: 'Action', platform: 'PC' };

    service.getGame(1).subscribe(game => {
      expect(game).toEqual(dummyGame);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/game?id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGame);
  });

  it('should retrieve all games from the API via GET', () => {
    const dummyGames: Game[] = [
      { id: 1, title: 'Game 1', thumbnail: 'img1.jpg', short_description: 'Desc 1', genre: 'Action', platform: 'PC' },
      { id: 2, title: 'Game 2', thumbnail: 'img2.jpg', short_description: 'Desc 2', genre: 'Adventure', platform: 'Browser' },
    ];

    service.getAllGames().subscribe(games => {
      expect(games.length).toBe(2);
      expect(games).toEqual(dummyGames);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/games`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGames);
  });
});
