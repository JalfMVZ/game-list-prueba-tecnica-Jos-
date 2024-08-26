import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameFilterComponent } from './game-filter.component';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Game } from 'src/interfaces/game.interface';

describe('GameFilterComponent', () => {
  let component: GameFilterComponent;
  let fixture: ComponentFixture<GameFilterComponent>;
  let gameService: jasmine.SpyObj<GameService>;

  const mockGames: Game[] = [
    { id: 1, title: 'Game 1', thumbnail: 'img1.jpg', short_description: 'Desc 1', genre: 'Action', platform: 'PC' },
    { id: 2, title: 'Game 2', thumbnail: 'img2.jpg', short_description: 'Desc 2', genre: 'Adventure', platform: 'Browser' },
  ];

  beforeEach(async () => {
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['getAllGames']);
    gameServiceSpy.getAllGames.and.returnValue(of(mockGames)); 

    await TestBed.configureTestingModule({
      declarations: [GameFilterComponent],
      providers: [{ provide: GameService, useValue: gameServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GameFilterComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load genres and platforms on init', () => {
    component.ngOnInit();
    expect(component.genres.length).toBe(2);
    expect(component.platforms.length).toBe(2);
  });

  it('should emit filterChanged event on filter change', () => {
    spyOn(component.filterChanged, 'emit');
    component.onFilterChange('Game', 'Action', 'PC');
    expect(component.filterChanged.emit).toHaveBeenCalledWith({ name: 'Game', genre: 'Action', platform: 'PC' });
  });
});
