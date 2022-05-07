export class Game {
  public playerNames: string[] = [];
  public playerPoints: number[] = [];
  public currentPlayer: number = 0;
  public currentQuestion: string = '';

  public toJson() {
    return {
      playerNames: this.playerNames,
      playerPoints: this.playerPoints,
      currentPlayer: this.currentPlayer,
      currentQuestion: this.currentQuestion,
    };
  }
}

function shuffle(array: string[]) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
