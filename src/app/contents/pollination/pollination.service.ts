import { Injectable } from '@angular/core'
import { pollination } from './pollination.model'
import { Crop } from './crop.model'
import { Melon } from './melon.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class PollinationService {
    allChange = new Subject<any>();

    private pollinationPath ="/pollination";
    private cropsPath = "/crops";
    private melonPath = "/melon";

    pollinationRef: AngularFirestoreCollection<pollination> = null;
    cropsRef: AngularFirestoreCollection<Crop> = null;
    melonRef: AngularFirestoreCollection<Melon> = null;


    constructor(private db: AngularFirestore) {
        this.pollinationRef = db.collection(this.pollinationPath);
        this.cropsRef = db.collection(this.cropsPath);
        this.melonRef = db.collection(this.melonPath);
    }

    addPollination(pollination) {
        return this.pollinationRef.add({ ...pollination });
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
            console.log("delete done");
        })
        .catch(err => {
            console.log(err);
        })
    }

    getPollinationList(): AngularFirestoreCollection<pollination> {
        return this.pollinationRef;
    }
    getTagColorById(docId) {
        return this.db.collection<pollination>('/pollination', ref => ref.where('docId', "==", docId)).valueChanges();
    }
    getTagColorByIdSnapshot(docId) {
        return this.db.collection<pollination>('/pollination', ref => ref.where('docId', "==", docId));
    }
    getCropsList(): AngularFirestoreCollection<Crop> {
        return this.cropsRef;
    }
    getCropById(docId: string) {
        return this.cropsRef.doc<Crop>(docId).valueChanges();
    }
    updateCropStatus(docId: string, status) {
        return this.cropsRef.doc<Crop>(docId).update({status: status});
    }
    getMelonList(): AngularFirestoreCollection<Melon> {
        return this.melonRef;
    }
    getMelonById(melon) {
        return this.melonRef.doc<Melon>(melon).valueChanges();
    }

    updateDetail(docId, value, key) {
        switch (key) {
            case "UPDATE_CROP_DETAIL":
                return this.cropsRef.doc<Crop>(docId).update(value);
            default:
                break;
        }
    }
    // getCropDetails(cropId) {
    //     return this.db.collection<Crop>('crops', ref => ref.where('cropId', "==", cropId)).valueChanges()
    //     .pipe(
    //         switchMap(crop => {
    //             const id = crop.map(c => c.cropId);

    //             return combineLatest(
    //                 of(crop),
    //                 combineLatest(
    //                     id.map(i => this.db.collection<pollination>('pollination', ref => ref.where('cropId', "==", i))
    //                     .valueChanges()
    //                     .pipe(map(p => p))
    //                 )
    //             )
    //             )
    //         }),
    //         map(([crop, p]) => {
    //             return crop.map(c => {
    //                 return {
    //                     ...c,
    //                     tagColors: p
    //                 }
    //             }
    //             )
    //         })
    //     )
    // }

    
}