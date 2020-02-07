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
    selectedCrop = null;
    typeArray = [];
    selectedType = null;
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
            this.isLoaded = true;
        })
    }

    onChange() {
        if(this.selectedCrop != null) {
            this.plService.getCropDetails(this.selectedCrop)
            .subscribe(data => {
                console.log(data);
                data[0]['species'].forEach(element => {
                    this.typeArray.push(element);
                });
            })
        }
    }
}