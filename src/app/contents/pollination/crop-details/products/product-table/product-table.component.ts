import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PollinationService } from '../../../pollination.service'
import { Product } from '../../../product.model'
import { Observable, Subscription, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { MatTableDataSource } from'@angular/material/table'

import { uiService } from '../../../../../shared/ui.service'

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.scss']
})

export class ProductTableComponent implements OnInit, AfterViewInit, OnDestroy {


    columns = [
        { columnDef: "status", header: "status", cell: (element: any) => `${ element.status }`},
        { columnDef: "row", header: "row", cell: (element: any) => `${ element.row }`},
        { columnDef: "tagColor", header: "tag", cell: (element: any) => `${ element.tagColor }`},
        { columnDef: "species", header: "species", cell: (element: any) => `${ element.species }`},
        { columnDef: "grade", header: "grade", cell: (element: any) => `${ element.grade }`},
        { columnDef: "weight", header: "weight [kg]", cell: (element: any) => `${ element.weight }`},
        { columnDef: "estHarvestDate", header: "estH_Date", cell: (element: any) => `${ element.estHarvestDate }`},
    ];


    // displayedColumns = ["status", "row", "tagColor", "species", "grade", "weight", "estHarvestDate", 'id' ];
    displayedColumns = this.columns.map(c => c.columnDef);
    dataSource: MatTableDataSource<Product>;
    private productSubscription: Subscription;
    // private rawData: Observable<Product[]>;

    // dataSource: ProductDataSource;

    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    private docId: string;
    private isLoaded = false;



    constructor(
        private ps: PollinationService,
        private ui: uiService,
        private route: ActivatedRoute
        ) {}

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
          if(result.formValue === undefined) {
            return;
          }
            const status = result.formValue.status;
            const id = result.id;
            const value = result.formValue;
            switch(status) {
                case "cutted": {
                  if(status !== null
                    || value.weight !== null) {
                    this.ps.updateDetail(id, value, "UPDATE_PRODUCT_SORTING")
                    .then(() => {
                      this.ui.dataMessage(`UPDATE: ${element.row} -> CUTTED`, 2000);
                    })
                    .catch(error => {
                      this.ui.dataMessage(`UPDATE_ERROR: ${element.row}`, 2000);
                    })
                  }
                }
                case "sole": {
                    if(status !== null ||
                      value.weight !== null ||
                      value.price !== null ||
                      value.customer !== null) {
                        this.ps.updateDetail(id, value, "UPDATE_PRODUCT_SORTING")
                        .then(() => {
                            this.ui.dataMessage(`UPDATE: ${element.row} -> SOLE`, 2000);
                        })
                        .catch(error => {
                            this.ui.dataMessage(`UPDATE_ERROR: ${element.row}`, 2000);
                        })
                    }
                    break;
                }
                case "eaten": {
                    if(status !== null ||
                      value.weight !== null ||
                      value.brix !== null) {
                        this.ps.updateDetail(id, value, "UPDATE_PRODUCT_SORTING")
                        .then(() => {
                            this.ui.dataMessage(`UPDATE: ${element.row} -> EATEN[TESTING]`, 2000);
                        })
                        .catch(error => {
                            this.ui.dataMessage(`UPDATE_ERROR: ${element.row}`, 2000);
                        })
                    }
                    break;
                }
                case "lost": {
                    if(status !== null ||
                      value.weight !== null ||
                      value.info !== null) {
                        this.ps.updateDetail(id, value, "UPDATE_PRODUCT_SORTING")
                        .then(() => {
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

    // calcTotalWeight() {
    //   var totalWeight = 0;
    //   totalWeight = this.dataSource.data.map(t => t.weight).reduce((sum, value) => sum + value, 0);
    //   console.log("weight summation");
    //   console.log(totalWeight);
    //   var avgWeight = totalWeight / this.dataSource.data.length;
    //   console.log(`average weight: ${avgWeight}`);
    // }
}
