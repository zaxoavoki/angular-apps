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

      let winner = this.checkWinner(this.field);
      if (winner !== null) {
        this.winner = winner;
      }

      const [, i] = this.minimax(this.field, this.turn, 10, true);
      this.field[i] = this.turn;
      this.turn = +!this.turn;

      winner = this.checkWinner(this.field);
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

  calculateState(field: number[], turn: number, idx: number): number[] {
    if (field[idx] === null) {
      field[idx] = turn;
    }
    return field;
  }

  minimax(
    field: number[],
    turn: number,
    depth: number,
    expectMax: boolean
  ): any {
    const possibleMoves = field
      .map((e: number, i: number) => [e, i])
      .filter((e: number[]) => e[0] === null);

    if (depth === 0 || possibleMoves.length === 0) {
      const winner = this.checkWinner(field);
      return [winner === this.turn ? 1 : winner === null ? 0 : -1, null];
    }

    let max = [-1, null];
    let min = [2, null];

    const possibleStates = possibleMoves.map((e: number[]) => [
      e[1],
      this.calculateState([...field], turn, e[1]),
    ]);

    for (const [i, state] of possibleStates) {
      const [value,] = this.minimax(
        state as number[],
        turn ^ 1,
        depth - 1,
        !expectMax
      );
      if (expectMax && value > (max[0] as number)) {
        max = [value, i];
      }
      if (!expectMax && value < (min[0] as number)) {
        min = [value, i];
      }
    }

    return expectMax ? max : min;
  }
}
