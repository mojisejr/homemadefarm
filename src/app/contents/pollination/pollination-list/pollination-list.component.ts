import { Component, OnInit, ViewChild } from '@angular/core'
import { PollinationService } from '../pollination.service'
import { pollination } from '../pollination.model'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'


import { MatDialog } from '@angular/material/dialog'
import { DeleteDialogComponent } from "./delete-dialog.component"

@Component({
    selector: 'app-pollination-list',
    templateUrl: './pollination-list.component.html',
    styleUrls: ['./pollination-list.component.css'],
})

export class PollinationListComponent implements OnInit {
    isLoaded = false;
    pollinations: pollination[];
    dataSource: any;
    displayedColumns: string[] = ['cropId', 'tagColor', 'createdAt', 'action'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private plService: PollinationService, public dialog: MatDialog) {}

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

    onDelete(data: pollination)  {
        // this.plService.deleteTag(id);
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            data: {
                id: data.id,
                cropId: data.cropId,
                tagColor: data.tagColor
            }
        });
        dialogRef.afterClosed().subscribe(dataFromDialog => {
            if(dataFromDialog) {
                this.plService.deleteTag(dataFromDialog);
            }
        })
    }
}