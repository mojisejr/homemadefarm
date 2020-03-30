import { Component, OnInit, Input } from '@angular/core'
import { Seed } from '../stock.model';

@Component({
    selector: 'app-stock-card',
    templateUrl: './stock-card.component.html',
    styleUrls: ['./stock-card.component.css']
})

export class AppStockCardComponent {

    private _seed: Seed;

    @Input()
    set seed(seed: Seed) {
        this._seed = seed;
    }

}