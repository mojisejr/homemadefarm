import { Injectable } from '@angular/core'
import { pollination } from './pollination.model'
import { Crop } from './crop.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

@Injectable({
    providedIn: 'root',
})
export class PollinationService {

    private pollinationPath ="/pollination";
    private cropsPath = "/crops";

    pollinationRef: AngularFirestoreCollection<pollination> = null;
    cropsRef: AngularFirestoreCollection<Crop> = null;


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
            console.log("delete done")
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
}