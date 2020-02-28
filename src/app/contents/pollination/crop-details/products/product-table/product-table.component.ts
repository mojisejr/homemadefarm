import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PollinationService } from '../../../pollination.service'
import { Product } from '../../../product.model'
import { Observable, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { ProductDataSource } from './product-datasource'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from'@angular/material/table'
import { SelectionModel } from '@angular/cdk/collections'

import { uiService } from '../../../../../shared/ui.service'

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.css']
})

export class ProductTableComponent implements OnInit, AfterViewInit, OnDestroy {
    displayedColumns = ["row", "tagColor", "species", "grade", "estHarvestDate", 'id' ];
    private dataSource: MatTableDataSource<Product>;
    private selection = new SelectionModel<Product>(true, []);
    private productSubscription: Subscription;
    // private rawData: Observable<Product[]>;

    // dataSource: ProductDataSource;

    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    private docId: string;
    private isLoaded = false;



    constructor(private ps: PollinationService,
        private ui: uiService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(id => {
            this.docId = id['id'];
        })
    }

    ngAfterViewInit() {
        if(this.docId != null) {
            this.productSubscription = this.ps.productChanged.subscribe((product: Product[]) => {
                this.dataSource = new MatTableDataSource(product);
                this.isLoaded = true;
            })
            this.ps.fetchProductByCropId(this.docId);
            // this.ps.getProductByCropId(this.docId)
            // .pipe(
            //     map(actions => actions.map(a => {
            //         return {
            //             id: a.payload.doc.id,
            //             ...a.payload.doc.data(),
            //         }
            //     }))
            // ).subscribe(data => {
            //     this.dataSource.data = data;
            //     this.dataSource.paginator = this.paginator;
            //     this.isLoaded = true;
            // })
            // this.dataSource = new ProductDataSource(this.ps);
            // this.dataSource.getProductDataByCropId(this.docId);
        }

    }

    ngOnDestroy() {
        this.productSubscription.unsubscribe();
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