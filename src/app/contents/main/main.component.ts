import { Component, OnInit } from '@angular/core';
import { PollinationService } from '../pollination/pollination.service'
import { Crop } from '../pollination/crop.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  cropList$: Observable<Crop[]>;

  constructor(private ps: PollinationService) { }

  ngOnInit() {
    this.cropList$ = this.ps.getActiveCropList();
  }
}
