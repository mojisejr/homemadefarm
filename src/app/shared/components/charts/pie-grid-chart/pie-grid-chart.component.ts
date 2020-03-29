import { Component, OnInit, Input } from '@angular/core'
import { FirebaseService } from "../../../firebase.service"
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-pie-grid-chart',
    templateUrl: './pie-grid-chart.component.html'
})

export class AppPieGridChartComponent implements OnInit {

    _data: [];
    unit = "*C";
    view: [300,200];
    showText = false;


    @Input()
    set data(data: any) {
        this._data = data;
    }
    get data(): any { return this._data; }

    constructor(private fs: FirebaseService) {
    }



    ngOnInit() {
        Object.assign(this, this._data);
    }

}