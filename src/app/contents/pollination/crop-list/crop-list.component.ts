import { Component, OnInit } from "@angular/core";
import { Observable, of} from 'rxjs'
import { map, filter, combineLatest } from 'rxjs/operators'
import { PollinationService } from '../pollination.service'
import { Crop } from '../crop.model'

@Component({
    selector: "app-crop-list",
    templateUrl: "./crop-list.component.html",
    styleUrls: ["./crop-list.component.css"]
})

export class CropListComponent implements OnInit {
    cropList$: Observable<Crop[]>;
    historyCropList$: Observable<Crop[]>;
    constructor(private plService: PollinationService) {}

    ngOnInit() {
        this.cropList$ = this.plService.getActiveCropList();
        this.historyCropList$ = this.plService.getHistoryCropList();
    }
}