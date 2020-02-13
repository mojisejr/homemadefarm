import { Component, OnInit } from '@angular/core'
import { ProductsService } from '../../products.service'
import { Crop } from '../../crop.model'

@Component({
    selector: 'app-crop-list',
    templateUrl: './crop-list.component.html',
    styleUrls: ['./crop-list.component.css']
})

export class CropListComponent implements OnInit {

    isLoaded = false;
    crops: Crop[];
    constructor(private ps: ProductsService) {}

    ngOnInit() {
        this.ps.getCropsList()
        .snapshotChanges()
        .subscribe(results => {
            this.crops = results.map(result => {
                return {
                    ...result.payload.doc.data(),
                } as Crop;
            })
            console.log(this.crops);
            this.isLoaded = true;
        })
    }
}