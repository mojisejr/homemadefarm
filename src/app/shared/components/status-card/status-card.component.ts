import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})

export class AppStatusCardComponent implements OnInit {

  _title: string;
  _hint: string;
  _data: any;

  @Input()
  set data(data: any) {
    this._data = data;
  }
  @Input()
  set title(title: string) {
    this._title = title;
  }
  @Input()
  set card_hint(card_hint: string) {
    this._hint = card_hint;
  }

  constructor() {}

  ngOnInit() {}
}
