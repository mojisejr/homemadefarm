import { Component, OnInit } from "@angular/core";
import { FirebaseService } from '../../../shared/firebase.service'

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
    constructor(private plService: PollinationService,
        private fb: FirebaseService) {}

    ngOnInit() {
        this.plService.getCropsList()
        .snapshotChanges()
        .subscribe(list => {
            this.cropList = list.map(e => {
                return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data()
                } as Crop;
            })
            this.isLoaded = true;
        })        
    }
}