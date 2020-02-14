import { Component, OnInit} from '@angular/core'
import { Melon } from '../melon.model'
import { pollination } from '../pollination.model'
import { Crop } from '../crop.model'
import { PollinationService } from '../pollination.service'
import { ActivatedRoute } from '@angular/router'
import { Observable, of } from 'rxjs'
import { switchMap, map, combineLatest } from 'rxjs/operators'


@Component({
    selector: 'app-crop-details',
    templateUrl: './crop-details.component.html',
    styleUrls: ['./crop-details.component.css']
})

export class CropDetailsComponent implements OnInit {

    isLoaded = false;
    melon: Melon[];
    types: Observable<pollination[]>;
    all$: Observable<{types: pollination[], melon: Melon[]}>;
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

    onTypeSelectionChange({ value }) {
        if(value != null && this.docId != null) {
            this.all$ = combineLatest(
                this.ps.getTagColorById(this.docId),
                this.ps.getMelonById(value)
            ).pipe(
                map(([types, melon]) => {
                    return {types, melon}
                })
            )
        }
    }
}