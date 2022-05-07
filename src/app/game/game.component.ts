import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import db from 'src/assets/db.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  questions: any;
  gameOver = false;
  playerName: string = '';
  currentQ: any = '213219378';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {
    this.questions = db;
  }

  ngOnInit(): void {
    this.shuffle(this.questions);
    this.currentQ = this.questions.pop();
    this.playerName = JSON.parse(localStorage.getItem('playerName'));
    this.currentQ = this.questions.pop();
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
        });
    });
  }

  newGame() {
    this.game = new Game();
  }

  // editPlayer(playerId: number) {
  //   const dialogRef = this.dialog.open(EditPlayerComponent);
  //   dialogRef.afterClosed().subscribe((change: string) => {
  //     if (change == 'DELETE') {
  //       this.game.players.splice(playerId, 1);
  //       this.game.playerImages.splice(playerId, 1);
  //     } else if (change) {
  //       this.game.playerImages[playerId] = change;
  //     }
  //     this.saveGame();
  //   });
  // }

  takeCard() {
    if (this.questions.length == 0) {
      this.gameOver = true;
    } else if (
      this.game.playerNames.length > 0 &&
      this.playerName == this.game.playerNames[this.game.currentPlayer]
    ) {
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
    }
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

  shuffle(array: string[]) {
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
}
