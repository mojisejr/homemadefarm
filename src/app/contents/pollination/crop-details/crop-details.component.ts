import { Component, OnInit} from '@angular/core'
import { Melon } from '../melon.model'
import { pollination } from '../pollination.model'
import { Crop } from '../crop.model'
import { PollinationService } from '../pollination.service'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'


@Component({
    selector: 'app-crop-details',
    templateUrl: './crop-details.component.html',
    styleUrls: ['./crop-details.component.css']
})

export class CropDetailsComponent implements OnInit {

    isLoaded = false;
    melon: Melon[];
    types: pollination[];
    docId = null;
    cropDetails: Observable<Crop>;
    constructor(private ps: PollinationService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(id => {
            this.docId = id['id'];
        })
        if(this.docId != null) {
            this.cropDetails = this.ps.getCropById(this.docId);
        } else {
            this.isLoaded = false;
        }
        this.isLoaded = true;
    }
}