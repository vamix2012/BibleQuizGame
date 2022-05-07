export class Game {
  public playerNames: string[] = [];
  public playerPoints: number[] = [];
  public currentPlayer: number = 0;
  public currentQuestion: string = '';
  public questions: any[] = [];

  public toJson() {
    return {
      playerNames: this.playerNames,
      playerPoints: this.playerPoints,
      currentPlayer: this.currentPlayer,
      currentQuestion: this.currentQuestion,
      questions: this.questions,
    };
  }
}
