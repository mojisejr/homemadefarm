import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs'

import { PollinationService } from '../pollination.service'
import { Crop } from '../crop.model'

@Component({
    selector: "app-crop-list",
    templateUrl: "./crop-list.component.html",
    styleUrls: ["./crop-list.component.css"]
})

export class CropListComponent implements OnInit {
    isLoaded = false;
    cropList: Crop[];
    constructor(private plService: PollinationService) {}

    ngOnInit() {
        this.plService.getCropsList()
        .snapshotChanges()
        .subscribe(list => {
            this.cropList = list.map(e => {
                return {
                    ...e.payload.doc.data()
                } as Crop;
            })
            console.log(this.cropList);
            this.isLoaded = true;
        })
    }

    onDetail(data) {
        this.plService.cropChanged.next( ...data);
    }
}