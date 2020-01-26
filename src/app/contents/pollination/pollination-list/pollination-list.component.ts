import { Component, OnInit, ViewChild } from '@angular/core'
import { PollinationService } from '../pollination.service'
import { pollination } from '../pollination.model'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-pollination-list',
    templateUrl: './pollination-list.component.html',
    styleUrls: ['./pollination-list.component.css']
})

export class PollinationListComponent implements OnInit {
    isLoaded = false;
    pollinations: pollination[];
    dataSource: any;
    displayedColumns: string[] = ['cropId', 'tagColor', 'createdAt', 'action'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private plService: PollinationService) {}

    ngOnInit() {
        this.plService.getPollinationList().snapshotChanges()
        .subscribe(data => {
            this.pollinations = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data()
                } as pollination;
            })
            this.isLoaded = true;
            this.dataSource = new MatTableDataSource<pollination>(this.pollinations);
            this.dataSource.paginator = this.paginator;
        })
    }

    onDelete(id: string)  {
        this.plService.deleteTag(id);
    }
}