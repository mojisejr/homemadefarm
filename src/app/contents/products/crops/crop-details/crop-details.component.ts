import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductsService } from '../../products.service'
import { Crop } from '../../crop.model'


@Component({
    selector: 'app-crop-details',
    templateUrl: './crop-details.component.html',
    styleUrls: ['./crop-details.component.css']
})

export class CropDetailsComponent implements OnInit {
    cropId: string = null;
    cropDetails: Array<any> = null;
    tagColors: Array<any> = null;
    isLoaded = false;
    constructor(private route: ActivatedRoute,
        private ps: ProductsService) {}
    ngOnInit() {
        this.cropId = this.route.snapshot.params['id']
        this.ps.getCropDetails(this.cropId)
        .subscribe(results => {
            this.cropDetails = results.map(result => {
                return {
                    ...result
                }
            })
            this.cropDetails = this.cropDetails[0];
            console.log(this.cropDetails);
            console.log(this.tagColors);
            this.isLoaded = true;
        })
    }
}