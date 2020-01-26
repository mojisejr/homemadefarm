import { Injectable } from '@angular/core'
import { pollination } from './pollination.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

@Injectable({
    providedIn: 'root',
})
export class PollinationService {

    private dbPath ="/pollination";

    pollinationRef: AngularFirestoreCollection<pollination> = null;


    constructor(private db: AngularFirestore) {
        this.pollinationRef = db.collection(this.dbPath);
    }

    addPollination(pollination: pollination) {
        this.pollinationRef.add({ ...pollination });
    }

    deleteTag(id: string) {
        this.db.doc('/pollination/' + id)
        .delete();
    }

    getPollinationList(): AngularFirestoreCollection<pollination> {
        return this.pollinationRef;
    }
}