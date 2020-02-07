import { Injectable } from '@angular/core'
import { pollination } from './pollination.model'
import { Crop } from './crop.model'
import { Melon } from './melon.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
import { uniq } from 'lodash'

@Injectable({
    providedIn: 'root',
})
export class PollinationService {

    private pollinationPath ="/pollination";
    private cropsPath = "/crops";

    pollinationRef: AngularFirestoreCollection<pollination> = null;
    cropsRef: AngularFirestoreCollection<Crop> = null;
    melonRef: AngularFirestoreCollection<Melon> = null;


    constructor(private db: AngularFirestore) {
        this.pollinationRef = db.collection(this.pollinationPath);
        this.cropsRef = db.collection(this.cropsPath);
    }

    addPollination(pollination: pollination) {
        this.pollinationRef.add({ ...pollination });
    }

    addCrop(crop: Crop) {
        this.cropsRef.add({ 
            ...crop,
            status: 'Initial'
         });
    }

    deleteTag(id: string) {
        this.db.doc('/pollination/' + id)
        .delete()
        .then(data => {
            // console.log("delete done")
        })
        .catch(err => {
            console.log(err);
        })
    }

    getPollinationList(): AngularFirestoreCollection<pollination> {
        return this.pollinationRef;
    }
    getCropsList(): AngularFirestoreCollection<Crop> {
        return this.cropsRef;
    }
    getCropDetails(cropId) {
        return this.db.collection<Crop>('crops', ref => ref.where('cropId', "==", cropId)).valueChanges()
        .pipe(
            switchMap(crop => {
                const id = crop.map(c => c.cropId);

                return combineLatest(
                    of(crop),
                    combineLatest(
                        id.map(i => this.db.collection<pollination>('pollination', ref => ref.where('cropId', "==", i))
                        .valueChanges()
                        .pipe(map(p => p))
                    )
                )
                )
            }),
            map(([crop, p]) => {
                return crop.map(c => {
                    return {
                        ...c,
                        tagColors: p
                    }
                }
                )
            })
        )
    }
}