import { Component, OnInit, Input, AfterViewInit } from '@angular/core'
import { PollinationService } from '../../../pollination.service'
import { uiService } from '../../../../../shared/ui.service'
import { Observable, combineLatest } from 'rxjs'
import { map, filter, finalize, distinct } from 'rxjs/operators'
import { Product } from '../../../product.model'
import { uniq } from 'lodash'



@Component({
    selector: 'app-sorting-table',
    templateUrl: './sorting-table.component.html',
    styleUrls: ['./sorting-table.component.scss']
})

export class SortingTableComponent implements OnInit, AfterViewInit {

    private _docId: string;
    private dataSource$: Observable<Product[]>;
    private speciesList: string[];


    private displayedColumns;
    private columns;

    private _groupby: string;
    private sortedDate: Date;

    @Input()
    set docId(docId: string) {
        this._docId = docId;
    }
    get docId(): string { return this._docId; }

    constructor(private ps: PollinationService,
        private ui: uiService) {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getProductSnapshot().pipe(
            map(snaps => {
                return snaps.map(snap => snap.species)
            })
        )
        .subscribe(data => {
            this.speciesList = uniq(data);
        })
    }

    getGroupBy(by: string, status: any) {
        this._groupby = by + " : " + status;
        this.getDataColumns(by, status);

        this.dataSource$ = this.getProductSnapshot().pipe(
            map(snaps => {
                return snaps.filter(snap => {
                    if(by === "species") {
                        return snap[by].includes(status);
                    } else if(by === "status" && snap.status !== undefined) {
                        return snap[by].includes(status);
                    } else {
                        return;
                    }
                });
            })
        )
    }

    getGroupByDate() {
        this.ui.showDatePickerDialog().afterClosed().subscribe(selectedDate => {
            this._groupby = "Date : " + selectedDate;
            this.getDataColumns('date', selectedDate);
            this.dataSource$ = this.getProductSnapshot().pipe(
                map(snaps => {
                    return snaps.filter(snap => {
                        return snap.estHarvestDate === selectedDate;
                    })
                })
            )
        })
    }

    getProductSnapshot(): Observable<Product[]> {
        return this.ps.getProductByCropId(this.docId).pipe(
            map(snaps => {
                return snaps.map(snap => {
                    return <Product> {
                        id: snap.payload.doc.id,
                        ...snap.payload.doc.data()
                    }
                })
            })
        )
    }

    getDataColumns(by: string, status: any) {
        const rws = [
            { columnDef: "row", header: "row", cell: (element: any) => `${ element.row }` },
            { columnDef: "weight", header: "weight[kg]", cell: (element: any) => `${ element.weight }` },
            { columnDef: "species", header: "species", cell: (element: any) => `${ element.species }` },
        ]

        const rsi = [
            { columnDef: "row", header: "row", cell: (element: any) => `${ element.row }` },
            { columnDef: "species", header: "species", cell: (element: any) => `${ element.species }` },
            { columnDef: "info", header: "info", cell: (element: any) => `${ element.info }`}
        ]

        const rsbi = [
            { columnDef: "row", header: "row", cell: (element: any) => `${ element.row }` },
            { columnDef: "species", header: "species", cell: (element: any) => `${ element.species }` },
            { columnDef: "brix", header: "brix", cell: (element: any) => `${ element.brix }`},
            { columnDef: "info", header: "info", cell: (element: any) => `${ element.info }`}
        ]

        const rspc = [
          { columnDef: "row", header: "row", cell: (element: any) => `${element.row}` },
          { columnDef: "species", header: "species", cell: (element: any) => `${element.species}` },
          { columnDef: "customer", header: "customer", cell: (element: any) => `${element.customer}` },
          { columnDef: "price", header: "price", cell: (element: any) => `${element.price}` },
        ]

        const specie = [
            { columnDef: "row", header: "row", cell: (element: any) => `${ element.row }` },
            { columnDef: "weight", header: "weight", cell: (element: any) => `${ element.weight}`},
            { columnDef: "status", header: "status", cell: (element: any) => `${ element.status }`},
            { columnDef: "estHarvestDate", header: "estH_date", cell: (element: any) => `${ element.estHarvestDate }`}
        ]

        const date = [
            { columnDef: "row", header: "row", cell: (element: any) => `${ element.row }`},
            { columnDef: "species", header: "species", cell: (element: any) => `${ element.species }`},
            { columnDef: "tagColor", header: "tag" , cell: (element: any) => `${ element.tagColor }`}
        ]
        switch(by) {
            case "status": {
                if(status == 'sole') {
                    this.displayedColumns = rspc.map(c => c.columnDef);
                    this.columns = rspc;
                    break;
                }
                if(status == 'cutted') {
                    this.displayedColumns = rws.map(c => c.columnDef);
                    this.columns = rws;
                    break;
                } else if(status == 'lost') {
                    this.displayedColumns = rsi.map(c => c.columnDef);
                    this.columns = rsi;
                    break;
                } else if(status == 'eaten') {
                    this.displayedColumns = rsbi.map(c => c.columnDef);
                    this.columns = rsbi;
                    break;
                }
            }
            case "species": {
                this.displayedColumns = specie.map(c => c.columnDef);
                this.columns = specie;
                break;
            }

            case "date": {
                this.displayedColumns = date.map(c => c.columnDef);
                this.columns = date;
                break;
            }
            default: {
                this.displayedColumns = rws.map(c => c.columnDef);
                this.columns = rws;
                break;
            }
        }
    }

}
