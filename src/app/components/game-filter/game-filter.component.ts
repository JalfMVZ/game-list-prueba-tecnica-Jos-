import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-filter',
  templateUrl: './game-filter.component.html',
  styleUrls: ['./game-filter.component.css']
})
export class GameFilterComponent implements OnInit {
  genres: string[] = [];
  platforms: string[] = [];
  @Output() filterChanged = new EventEmitter<any>();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGenresAndPlatforms();
  }

  loadGenresAndPlatforms(): void {
    this.gameService.getAllGames().subscribe(games => {
      const genresSet = new Set<string>();
      const platformsSet = new Set<string>();
      
      games.forEach(game => {
        genresSet.add(game.genre);
        platformsSet.add(game.platform);
      });

      this.genres = Array.from(genresSet);
      this.platforms = Array.from(platformsSet);
    });
  }

  onFilterChange(name: string, genre: string, platform: string): void {
    this.filterChanged.emit({ name, genre, platform });
  }
}
