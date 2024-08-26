import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from 'src/interfaces/game.interface';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  game?: Game;
  loading: boolean = true;
  error: string = '';

  constructor(private route: ActivatedRoute, private gameService: GameService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGame(id);
  }

  private loadGame(id: number): void {
    this.gameService.getGame(id).subscribe(
      data => {
        this.game = data;
        this.loading = false;
      },
      error => {
        this.error = 'No se pudo cargar el juego. Por favor, intenta de nuevo más tarde.';
        this.loading = false;
      }
    );
  }
}
