export class Game {
  public players: string[] = [];
  public currentPlayer: number = 0;
  public currentQuestion: any = '';

  public toJson() {
    return {
      players: this.players,
      currentPlayer: this.currentPlayer,
      currentQuestion: this.currentQuestion,
    };
  }
}
