import { Component, OnInit, OnDestroy } from '@angular/core'
import { Melon } from '../melon.model'
import { pollination } from '../pollination.model'
import { Crop } from '../crop.model'
import { PollinationService } from '../pollination.service'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'


@Component({
    selector: 'app-crop-details',
    templateUrl: './crop-details.component.html',
    styleUrls: ['./crop-details.component.css']
})

export class CropDetailsComponent implements OnInit, OnDestroy {

    isLoaded = false;
    melon: Melon[];
    types: pollination[];
    cropId = null;
    cropDetails: Crop[];
    cropSub: Subscription;
    constructor(private ps: PollinationService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(id => {
            this.cropId = id['id'];
        })
        this.cropSub = this.ps.cropChanged.subscribe(crop => {
            console.log(crop);
        })
        this.isLoaded = true;
    }

    ngOnDestroy() {
        this.cropSub.unsubscribe();
    }

}