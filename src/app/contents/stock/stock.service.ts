import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Seed } from './stock.model';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class StockService {

    constructor(private af: AngularFirestore) {}

    addNewSeed(seed: Seed) {
        return this.af.collection('melon').doc(seed.name).set(seed);
    }

    updateTotalSeed(name, total) {
        return of(this.af.collection('melon').doc(name).update({
            total: total,
            status: "ready"
        })
        .then(() => {
            return true;
        })
        .catch(e => {
            return false;
        }))
    }

    // takeSeed(name, amount) {

    // }

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

    updateStockTotal(seed: Partial<Seed>[]): boolean {
        try {
            seed.forEach(seed => {
                if(seed.left === 0) {
                    this.af.collection('melon').doc(seed.species).update(
                        {
                            total: seed.left
                        }
                    )
                } else if(seed.left > 0) {
                    this.af.collection('melon').doc(seed.species).update(
                        {
                            total: seed.left,
                            status: 'out of stock'
                        }
                    )
                }
            })
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    updateSeedInfo(seed: Partial<Seed>) {
        return of(
            this.af.collection('melon').doc(seed.name).update(seed)
            .then(() => {
                return false;
            })
            .catch(e => {
                return false;
            })
        )
    }
}
