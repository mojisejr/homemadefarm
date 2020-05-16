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
  _unit: string;
  _format: any;

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

  @Input()
  set unit(unit: string) {
    this._unit = unit;
  }

  @Input()
  set format(format: string) {
    this._format = format;
  }

  constructor() {}

  ngOnInit() {}
}
