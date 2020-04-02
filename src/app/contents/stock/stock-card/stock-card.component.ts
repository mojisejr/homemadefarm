import { Component, OnInit, Input } from '@angular/core'
import { Seed } from '../stock.model';
import { Helper } from '../../../shared/helper.service'

@Component({
    selector: 'app-stock-card',
    templateUrl: './stock-card.component.html',
    styleUrls: ['./stock-card.component.css']
})

export class AppStockCardComponent implements OnInit {

    private _seed: Seed;

    @Input()
    set seed(seed: Seed) {
        this._seed = seed;
    }
    constructor(private hp: Helper) {}

    ngOnInit() {
        if(this._seed.imgUrl === null || this._seed.imgUrl === "") {
            this._seed.imgUrl = this.hp.googleDriveUrlToDisplayImageUrl("https://drive.google.com/open?id=17J0usGfJyrchB22KUc1ZmoE0wDOjLU9E");
        }
    }
    
}