import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  field: number[] = Array(9).fill(null);
  turn: number = 0;
  winner: number | null = null;

  makeTurn(idx: number) {
    if (this.winner !== null) {
      return;
    }

    if (this.field[idx] === null) {
      this.field[idx] = this.turn;
      this.turn = +!this.turn;
      const winner = this.checkWinner(this.field);
      if (winner !== null) {
        this.winner = winner;
      }
    }
  }

  checkWinner(field: number[]): number | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const winnerLine = line.reduce((a, c) => a + field[c], '');
      if (['111', '000'].indexOf(winnerLine) !== -1) {
        return +winnerLine[0];
      }
    }
    return null;
  }

  restartGame() {
    this.field = Array(9).fill(null);
    this.turn = 0;
    this.winner = null;
  }
}
