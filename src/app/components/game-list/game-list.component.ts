import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from 'src/interfaces/game.interface';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  pagedGames: Game[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  pagesToShow: number[] = [];
  filters = { name: '', genre: '', platform: '' };
  loading: boolean = true;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe(data => {
      this.games = data;
      this.applyFilters();
      this.loading = false;
    });
  }

  applyFilters(): void {
    this.filteredGames = this.games.filter(game => 
      (this.filters.name ? game.title.toLowerCase().includes(this.filters.name.toLowerCase()) : true) &&
      (this.filters.genre ? game.genre.toLowerCase() === this.filters.genre.toLowerCase() : true) &&
      (this.filters.platform ? game.platform.toLowerCase() === this.filters.platform.toLowerCase() : true)
    );
    this.totalPages = Math.ceil(this.filteredGames.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagedGames();
    this.updatePagination();
  }

  onFilterChanged(filters: any): void {
    this.filters = { ...this.filters, ...filters };
    this.applyFilters();
  }

  updatePagedGames(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedGames = this.filteredGames.slice(start, end);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedGames();
    this.updatePagination();
  }

  updatePagination(): void {
    this.pagesToShow = [];
    if (this.totalPages <= 10) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pagesToShow.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - 4);
      let end = Math.min(this.totalPages, start + 9);

      if (end - start < 9) {
        start = Math.max(1, end - 9);
      }

      for (let i = start; i <= end; i++) {
        this.pagesToShow.push(i);
      }

      if (start > 1) {
        this.pagesToShow.unshift(-1);
        this.pagesToShow.unshift(1);
      }
      if (end < this.totalPages) {
        this.pagesToShow.push(-1);
        this.pagesToShow.push(this.totalPages);
      }
    }
  }
}
