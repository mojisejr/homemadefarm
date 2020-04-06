import { Component, OnInit, Input } from '@angular/core'
import { Crop } from 'src/app/contents/pollination/crop.model';
import { Helper } from '../../helper.service';
import { PollinationService } from '../../../contents/pollination/pollination.service';
import { Melon } from 'src/app/contents/pollination/melon.model';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { pollination } from 'src/app/contents/pollination/pollination.model';

@Component({
    selector: 'app-show-card',
    templateUrl: './show-card.component.html',
    styleUrls: ['./show-card.component.scss']
})

export class AppShowCardComponent implements OnInit {

    private _crop: Crop;
    private dayCount: number;
    private melon$: Observable<Melon>;
    private harvestDate: any;
    private harvestday;
    private loaded = false;
    constructor(private hp: Helper,
        private ps: PollinationService) {}

     @Input()
     set crop(crop: Crop) {
         this._crop = crop;
     }
    ngOnInit() {
        if(this._crop.toBagAt != null) {
            this.dayCount = this.hp.diffTilNow(this._crop.toBagAt);
        } else {
            this.dayCount = 0;
        }

        this.melon$ = this.ps.getMelonById(this._crop.species[0].species);
        this.melon$.subscribe(data => {
            this.harvestday = data.harvestdays;
        })
        this.ps.getTagColorByIdSnapshotOne(this._crop.id)
        .snapshotChanges()
        .pipe(
            map(snaps => {
                return snaps.map(snap => {
                    return {
                        id: snap.payload.doc.id,
                        ...snap.payload.doc.data(),
                        harvestDate: this.hp.estHarvestCalc(snap.payload.doc.data().createdAt, this.harvestday)
                    }
                })
            })
        )
        .subscribe(snap => {
            if(snap.length > 0) {
                this.harvestDate = snap;
            } else {
                return;
            }
            this.loaded = true;
        })
    }
}

