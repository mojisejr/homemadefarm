import { Component, OnInit, Input } from '@angular/core'
import { ActivityService } from '../activity.service'
import { Observable } from 'rxjs'
import { Activity, Fertilizer } from '../activity.model'
import { uiService } from 'src/app/shared/ui.service';

@Component({
    selector: 'app-activities-table',
    templateUrl: './activities-table.component.html',
    styleUrls: ['./activities-table.component.css']
})

export class AppActivitiesTableComponent implements OnInit {

    private dataSource$: Observable<Activity[]>;
    private _docId: string;

    @Input()
    set docId(docId: string) {
        this._docId = docId;
    }

    get docId(): string {
        return this._docId;
    }

    displayedColumns = ["date", "category", "detail"];
   
    constructor(private as: ActivityService,
        private ui: uiService) {}

    ngOnInit() {
        this.dataSource$ = this.as.getActivityListByDocId(this._docId);
    }

    onMoreClick(activity: Activity) {
        this.ui.showActivityDetailsDialog(activity);
    }
}