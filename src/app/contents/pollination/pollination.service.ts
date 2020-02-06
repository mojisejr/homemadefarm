import { Injectable } from '@angular/core'
import { pollination } from './pollination.model'
import { Crop } from './crop.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { switchMap, map, combineLatest } from 'rxjs/operators'
import { uniq } from 'lodash'

@Injectable({
    providedIn: 'root',
})
export class PollinationService {

    private pollinationPath ="/pollination";
    private cropsPath = "/crops";

    pollinationRef: AngularFirestoreCollection<pollination> = null;
    cropsRef: AngularFirestoreCollection<Crop> = null;


    //--- Testing
    joinList$: Observable<any>;
    ////////
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
    getFullList() {
        return this.db.collection<pollination>('pollination').valueChanges()
        .pipe(
            switchMap(tagColor => {
                const tag_cropId = uniq(tagColor.map(tId => tId.cropId));
                return combineLatest(
                    of(tagColor), //return ตาราง tagColor ออกไปก่อน
                    combineLatest(
                        tag_cropId.map(CropID => {
                            this.db.collection<Crop>('crops', ref => ref.where('cropId', "==", CropID)).valueChanges()
                            .pipe(
                                map(Crop => Crop[0])
                            )
                        })
                    )
                );
            })
        )
    }
}