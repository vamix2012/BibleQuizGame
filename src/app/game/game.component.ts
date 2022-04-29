import { Component, OnInit } from '@angular/core';
import db from 'src/assets/db/db.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  questions: any = '';
  questionNumber = 0;
  message = 'abcd';

  constructor() {
    this.questions = db;
  }

  ngOnInit(): void {
    this.shuffle(this.questions);
  }

  checkAnswer(ans: any) {
    if (
      ans.toLocaleLowerCase() ==
      this.questions[this.questionNumber].corect.toLocaleLowerCase()
    ) {
      this.message = 'Corect';
      this.questionNumber++;
    } else {
      this.message =
        'Incorect, Raspuns corect -' +
        this.questions[this.questionNumber].corect +
        '-';
    }
  }

  next() {
    this.questionNumber++;
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
