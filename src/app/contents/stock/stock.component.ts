import { Component, OnInit } from '@angular/core';
import { uiService } from '../../shared/ui.service';


@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss']
})

export class AppStockComponent implements OnInit {
    constructor(private ui: uiService) {}

    ngOnInit() {}

    onStockCreate() {
        const dialogRef = this.ui.showStockCreateDialog();
    }
}