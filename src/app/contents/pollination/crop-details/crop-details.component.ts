import { Component, OnInit} from '@angular/core'
import { Melon } from '../melon.model'
import { pollination } from '../pollination.model'
import { Crop } from '../crop.model'
import { PollinationService } from '../pollination.service'
import { ActivatedRoute } from '@angular/router'
import { Observable, combineLatest } from 'rxjs'
import {  map } from 'rxjs/operators'


@Component({
    selector: 'app-crop-details',
    templateUrl: './crop-details.component.html',
    styleUrls: ['./crop-details.component.css']
})

export class CropDetailsComponent implements OnInit {

    melon: Melon[];
    types: Observable<pollination[]>;
    // all$: Observable<{types: pollination[], melon: Melon}>;
    all$: Observable<any>;
    docId = null;
    cropDetails: Observable<Crop>;


    displayedColumns = ['tagColor', 'createdAt', 'currentDay', 'dayLeft', 'estHarvestDate'];

    constructor(private ps: PollinationService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(id => {
            this.docId = id['id'];
        })
        if(this.docId != null) {
            this.cropDetails = this.ps.getCropById(this.docId);
        }
    }

    onTypeSelectionChange({ value }) {
        if(value != null && this.docId != null) {
            this.all$ = combineLatest(
                this.ps.getTagColorById(this.docId),
                this.ps.getMelonById(value)
            ).pipe(
                map(([types, melon]) => {
                    return types.map(type => {
                        return {
                            ...type,
                            currentDay: this.diffTilNow(type.createdAt), 
                            estHarvestDate: this.estHarvestCalc(type.createdAt, melon.harvestdays),
                            dayLeft: melon.harvestdays - this.diffTilNow(type.createdAt)
                        }
                    })
                })
            )
        }
    }

    estHarvestCalc(createdAt: Date, harvestday: number) {
        const onedayMs = 1000*60*60*24;

        //cannot use in_date directly
        const createdAt_str = createdAt.toString();
        const createdAt_ms= new Date(createdAt_str).getTime();

        const harvestday_ms = harvestday * onedayMs;

        const harvestdate = new Date(createdAt_ms + harvestday_ms).toLocaleDateString('en-Us');

        return harvestdate;
    }

    diffTilNow (in_date: Date) {
        const onedayMs = 1000*60*60*24;

        //cannot use in_date directly
        const in_dateStr = in_date.toString();
        const newDate = new Date(in_dateStr);

        

        const diff = new Date().getTime() - newDate.getTime();

        return Math.round(diff/onedayMs);
    }
}
