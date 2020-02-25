import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Product } from '../../../product.model'
import { PollinationService } from '../../../pollination.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.css']
})

export class ProductTableComponent implements OnInit {

    private dataSource: any;
    private docId: string;
    private isLoaded = false;

    displayedColumns = ["row", "tagColor", "species", "grade", "estHarvestDate" ];

    constructor(private ps: PollinationService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(id => {
            this.docId = id['id'];
        })

        if(this.docId != null) {
            this.ps.getProductByCropId(this.docId).subscribe(data => {
                this.dataSource = new MatTableDataSource(data);
                this.isLoaded = true;
            })
        }
    }

    applyFilter(filterValue: String) {
        if(this.dataSource != undefined) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }
        
    }
}