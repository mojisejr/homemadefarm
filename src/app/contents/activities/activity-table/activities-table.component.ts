import { Component, OnInit, Input } from '@angular/core'
import { ActivityService } from '../activity.service'
import { Observable } from 'rxjs'
import { Activity, Fertilizer } from '../activity.model'
import { uiService } from 'src/app/shared/ui.service';

@Component({
    selector: 'app-activities-table',
    templateUrl: './activities-table.component.html',
    styleUrls: ['./activities-table.component.scss']
})

export class AppActivitiesTableComponent implements OnInit {

    dataSource$: Observable<Activity[]>;
    _docId: string;

    @Input()
    set docId(docId: string) {
        this._docId = docId;
        this.dataSource$ = this.as.getActivityListByDocId(this._docId);
    }

    get docId(): string {
        return this._docId;
    }

    displayedColumns = ["date", "category", "detail"];

    constructor(private as: ActivityService,
        private ui: uiService) {}

    ngOnInit() {
        this.dataSource$ = this.as.getActivityListByDocId(this._docId);
        this.calcSum('fertilizer');
        this.calcSum('embeded');
        this.calcSum('spray');
    }

    onMoreClick(activity: Activity) {
        this.ui.showActivityDetailsDialog(activity);
    }

    calcSum(cat: string) {
      this.dataSource$.subscribe(data => {
        let count: number = 0;
        switch(cat) {
          case 'fertilizer': {
            count = data.filter(d => {
                return d.category.includes('fertilizer')
            }).length;
            this.as.subFertSum.next(count);
            break;
          }
          case 'embeded': {
            count = data.filter(d => {
                return d.category.includes('embeded')
            }).length;
            this.as.subEmbedSum.next(count);
            break;
          }
          case 'spray': {
            count = data.filter(d => {
              return d.category.includes('spray')
            }).length;
            this.as.subSpraySum.next(count);
            break;
          }
          default: return 0;
        }
      })
    }
}
