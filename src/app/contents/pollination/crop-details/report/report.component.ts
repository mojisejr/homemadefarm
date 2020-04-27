import { Component, OnInit, Input } from '@angular/core';
import { Crop } from '../../crop.model';
import { PollinationService } from '../../pollination.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class AppReportComponent implements OnInit {
  _crop: Crop;
  _id: String;

  @Input()
  set crop(crop: Crop) {
    this._crop = crop;
  }

  @Input()
  set docId(docId: String) {
    this._id = docId;
  }

  constructor(private ps: PollinationService) {}

  ngOnInit() {
  }

}
