import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PollinationService } from '../../../pollination.service'
import { MatTableDataSource } from '@angular/material/table'
import { Product } from '../../../product.model'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ProductDataSource } from './product-datasource'

import { uiService } from '../../../../../shared/ui.service'

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.css']
})

export class ProductTableComponent implements OnInit {
    displayedColumns = ["row", "tagColor", "species", "grade", "estHarvestDate", 'id' ];
    private dataSource: MatTableDataSource<Product>;
    private rawData: Observable<Product[]>;
    private docId: string;
    private isLoaded = false;



    constructor(private ps: PollinationService,
        private ui: uiService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(id => {
            this.docId = id['id'];
        })

        if(this.docId != null) {
            // this.ps.getProductByCropId(this.docId).subscribe(data => {
            //     this.dataSource = new MatTableDataSource(data);
            //     this.isLoaded = true;
            // })
            this.rawData = this.ps.getProductByCropId(this.docId)
            .pipe(
                map(actions => actions.map(a => {
                    return {
                        id: a.payload.doc.id,
                        ...a.payload.doc.data(),
                    }
                }))
            )
            this.rawData.subscribe(data => {
                this.dataSource = new MatTableDataSource(data);
                this.isLoaded = true;
            })
        }
    }

    onUpdate(element) {
        console.log(element);
        this.ui.showProductUpdateStatusDialog(element).afterClosed().subscribe(data => {
            console.log(data);
        })
    }

    applyFilter(filterValue: String) {
        if(this.dataSource != undefined) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }
        
    }
}