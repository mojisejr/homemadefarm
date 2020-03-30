import { Component, OnInit } from '@angular/core'
import { StockService } from '../stock.service'
import { Observable } from 'rxjs';
import { Seed } from '../stock.model';

@Component({
    selector: 'app-stock-list',
    templateUrl: './stock-list.component.html',
    styleUrls: ['./stock-list.component.css']
})

export class AppStockListComponent implements OnInit {

    private _seedStock$: Observable<Seed[]>;

    constructor(private stock: StockService) {}

    ngOnInit() {
        this._seedStock$ = this.stock.getSeedsStockList();
    }
    
}