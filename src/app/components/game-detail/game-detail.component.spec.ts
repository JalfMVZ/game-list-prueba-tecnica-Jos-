import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameDetailComponent } from './game-detail.component';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Game } from 'src/interfaces/game.interface';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
  let gameService: jasmine.SpyObj<GameService>;

  const mockGame: Game = {
    id: 1,
    title: 'Game 1',
    thumbnail: 'img1.jpg',
    short_description: 'Desc 1',
    genre: 'Action',
    platform: 'PC',
  };

  beforeEach(async () => {
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['getGame']);

    await TestBed.configureTestingModule({
      declarations: [GameDetailComponent],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  });

  afterEach(() => {
    gameService.getGame.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load game details on init', () => {
    gameService.getGame.and.returnValue(of(mockGame));
    component.ngOnInit();
    expect(component.game).toEqual(mockGame);
  });

  it('should handle error when game details are not found', () => {
    gameService.getGame.and.returnValue(throwError(() => new Error('Game not found')));
    component.ngOnInit();
    expect(component.error).toBe('No se pudo cargar el juego. Por favor, intenta de nuevo más tarde.');
  });
});
