import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Seed } from './stock.model';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class StockService {

    constructor(private af: AngularFirestore) {}

    addNewSeed(seed: Seed) {
        return this.af.collection('melon').doc(seed.name).set(seed);
    }

    getSeedsStockList(): Observable<Seed[]> {
        return this.af.collection<Seed>('melon')
        .snapshotChanges()
        .pipe(
            map(snaps => {
                return snaps.map(snap => {
                    return {
                        id: snap.payload.doc.id,
                        ...snap.payload.doc.data() as Seed
                    }
                })
            })
        )
    }
}