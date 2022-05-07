import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss'],
})
export class AddPlayerDialogComponent implements OnInit {
  name: string = '';
  constructor(public dialogRef: MatDialogRef<AddPlayerDialogComponent>) {}

  ngOnInit(): void {}

  @HostListener('document:keydown.enter', ['$event'])
  closeDialog() {
    this.dialogRef.close(this.name);
  }
}
