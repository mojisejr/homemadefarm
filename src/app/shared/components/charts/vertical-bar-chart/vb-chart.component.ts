import { Component, OnInit } from '@angular/core'
import { PollinationService } from "../../../../contents/pollination/pollination.service"
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-vb-chart',
    templateUrl: './vb-chart.component.html'
})

export class AppVerticalChartComponent implements OnInit {

    data: any[];

    view: any[] = [700, 400];

    //options
    showXAxis = true;
    showYAxis = true;
    gredient = false;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    xAxisLabel = "Type";
    yAxisLabel = "Day Of Harvesting [days]";

    constructor(private ps: PollinationService) {
    }



    ngOnInit() {
        this.ps.getMelonList().snapshotChanges()
        .pipe(
            map(snaps => {
                return snaps.map(snap => {
                    return {
                        name: snap.payload.doc.id,
                        value: snap.payload.doc.data()["harvestdays"]
                    }
                })
            })
        )
        .subscribe(data => {
            Object.assign(this, { data });
        })
    }

}