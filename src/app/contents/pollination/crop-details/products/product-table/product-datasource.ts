import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'
import { Product } from '../../../product.model'
import { PollinationService } from '../../../pollination.service'

export class ProductDataSource implements DataSource<Product> {
    
    private productSubject = new BehaviorSubject<Product[]>([]);
    private loadingProduct = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingProduct.asObservable();

    constructor(private ps: PollinationService) {}

    connect(collectionViewer: CollectionViewer): Observable<Product[]> {
        return this.productSubject.asObservable();
    }

    disconnect() {
        this.productSubject.complete();
        this.loadingProduct.complete();
    }

    getProductDataByCropId(docId: string) {

        this.loadingProduct.next(true);

        this.ps.getProductByCropId(docId)
        .pipe(
            finalize(() => this.loadingProduct.next(false)),
            map(product => product.map(p => {
                return {
                    id: p.payload.doc.id,
                    ...p.payload.doc.data(),
                }
            })),
            catchError(() => of([])),
        ).subscribe(product => this.productSubject.next(product));
    }
}