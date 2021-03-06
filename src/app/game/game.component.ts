import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  gameOver = false;
  playerName: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.playerName = JSON.parse(localStorage.getItem('playerName'));
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params.id;
      this.firestore
        .collection('Games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.currentPlayer = game.currentPlayer;
          this.game.currentQuestion = game.currentQuestion;
          this.game.playerNames = game.playerNames;
          this.game.questions = game.questions;
        });
    });
  }

  newGame() {
    this.game = new Game();
  }

checkAnswer(e: any){

  if(e.toLocaleLowerCase() == this.game.currentQuestion.corect.toLocaleLowerCase()) 
  {
    console.log("Corect")
}
  else 
  {
    console.log("Fals")
  }
}

  takeCard() {
    // if (this.questions.length == 0) {
    //   this.gameOver = true;
    // } else if (
    //   this.game.playerNames.length > 0 &&
    //   this.playerName == this.game.playerNames[this.game.currentPlayer]
    // ) {
    //   this.game.currentCard = this.game.stack.pop();
    //   this.game.pickCardAnimation = true;
    //   this.game.currentPlayer++;
    //   this.game.currentPlayer =
    //     this.game.currentPlayer % this.game.players.length;
    //   this.saveGame();
    //   setTimeout(() => {
    //     this.game.playedCards.push(this.game.currentCard);
    //     this.game.pickCardAnimation = false;
    //     this.saveGame();
    //   }, 1500);
    // } else if (this.game.players.length < 1) {
    //   this.openDialog();
    // } else if (this.game.stack.length < 1) {
    //   this.newGame();
    //  }
  }

  openDialog(): void {
    // if (!this.game.playerNames.includes(this.playerName)) {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.playerName = name;
        console.log(name);
        localStorage.setItem('playerName', JSON.stringify(name));
        this.game.playerNames.push(name);
        this.game.playerPoints.push(0);
        this.saveGame();
      }
    });
    // }
  }

  saveGame() {
    this.firestore
      .collection('Games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}
