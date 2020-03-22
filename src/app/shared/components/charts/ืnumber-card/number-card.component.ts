import { Component, OnInit, Input } from '@angular/core'
import { PollinationService } from "../../../../contents/pollination/pollination.service"
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-number-card',
    templateUrl: './number-card.component.html',
})

export class AppNumberCardComponent implements OnInit {

    view = [300, 200];
    _data: [];
    cardColor: string = '#232837';


    @Input()
    set data(data: any) {
        this._data = data;
    }
    get data(): any { return this._data; }



    constructor() {}

    ngOnInit() {
        
    }
}