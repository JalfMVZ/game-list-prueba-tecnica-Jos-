import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameListComponent } from './game-list.component';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';
import { Game } from 'src/interfaces/game.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let gameService: jasmine.SpyObj<GameService>;

  const mockGames: Game[] = [
    {
      id: 1,
      title: 'Game 1',
      thumbnail: 'img1.jpg',
      short_description: 'Desc 1',
      genre: 'Action',
      platform: 'PC',
    },
    {
      id: 2,
      title: 'Game 2',
      thumbnail: 'img2.jpg',
      short_description: 'Desc 2',
      genre: 'Adventure',
      platform: 'Browser',
    },
  ];

  beforeEach(async () => {
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['getGames']);
    gameServiceSpy.getGames.and.returnValue(of(mockGames));

    await TestBed.configureTestingModule({
      declarations: [GameListComponent],
      providers: [{ provide: GameService, useValue: gameServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load games on init', () => {
    fixture.detectChanges();
    expect(component.games.length).toBe(2);
    expect(component.filteredGames.length).toBe(2);
  });

  it('should filter games by name', () => {
    fixture.detectChanges();
    component.filters.name = 'Game 1';
    component.applyFilters();
    expect(component.filteredGames.length).toBe(1);
    expect(component.filteredGames[0].title).toBe('Game 1');
  });

  it('should update pagination correctly', () => {
    fixture.detectChanges();
    component.applyFilters();
    expect(component.totalPages).toBe(1);
    expect(component.pagedGames.length).toBe(2);
  });
});
