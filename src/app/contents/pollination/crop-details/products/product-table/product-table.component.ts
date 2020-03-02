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
    displayedColumns = ["status", "row", "tagColor", "species", "grade", "weight", "estHarvestDate", 'id' ];
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

        this.ui.showProductUpdateStatusDialog(element).afterClosed().subscribe(result => {
            switch(result.status) {
                case "cutted":
                case "sole": {
                    if(result.status !== null, result.weight !== null) {
                        const data = { status: result.status, weight: result.weight };
                        this.ps.updateDetail(result.id, data, "UPDATE_PRODUCT_SORTING")
                        .then(result => {
                            this.ui.dataMessage(`UPDATE: ${element.row} -> CUTTED`, 2000);
                        })
                        .catch(error => {
                            this.ui.dataMessage(`UPDATE_ERROR: ${element.row}`, 2000);
                        })
                    }
                    break;
                }
                case "eaten": {
                    if(result.status !== null, result.weight !== null) {
                        const data = { status: result.status, weight: result.weight, brix: result.brix, info: result.info };
                        this.ps.updateDetail(result.id, data, "UPDATE_PRODUCT_SORTING")
                        .then(result => {
                            this.ui.dataMessage(`UPDATE: ${element.row} -> EATEN[TESTING]`, 2000);
                        })
                        .catch(error => {
                            this.ui.dataMessage(`UPDATE_ERROR: ${element.row}`, 2000);
                        })
                    }
                    break;
                }
                case "lost": {
                    if(result.status !== null, result.weight !== null) {
                        const data = { status: result.status, weight: result.weight, info: result.info };
                        this.ps.updateDetail(result.id, data, "UPDATE_PRODUCT_SORTING")
                        .then(result => {
                            this.ui.dataMessage(`UPDATE: ${element.row} -> LOST[TESTING]`, 2000);
                        })
                        .catch(error => {
                            this.ui.dataMessage(`UPDATE_ERROR: ${element.row}`, 2000);
                        })
                    }
                    break;
                }
                default:
                    break;
            }
        })
    }

    applyFilter(filterValue: String) {
        if(this.dataSource != undefined) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }
        
    }
}