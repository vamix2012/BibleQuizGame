import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import db from 'src/assets/db.json';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  questions: any = '';
  constructor(private firestore: AngularFirestore, private router: Router) {
    this.questions = db;
  }

  ngOnInit(): void {}

  newGame() {
    let game = new Game();
    this.shuffle(this.questions);
    game.questions = this.questions;
    game.currentQuestion = game.questions.pop();
    this.firestore
      .collection('Games')
      .add(game.toJson())
      .then((gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
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
