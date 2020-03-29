import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Subject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { uiService } from '../../shared/ui.service'
import { Activity } from './activity.model';

@Injectable({
    providedIn: 'root',
})
export class ActivityService {

    constructor(
        private db: AngularFirestore,
        private ui: uiService
    ) {}

    addActivity(activity: Activity) {
        this.db.collection('activities').add(activity)
        .then(() => {
            this.ui.dataMessage("Activity Added Successfully",2000);
        })
        .catch(err => {
            this.ui.dataMessage(err, 2000);
        })
    }
    
    updateActivity() {

    }

    deleteActivity(docId: string) {

    }

    getActivityListByDocId(docId: string): Observable<Activity[]> {
        // console.log(`docId: ${docId}`)
        return this.db.collection<Activity>('/activities', ref => ref.where('docId', "==", docId.toString()).orderBy('date', 'desc'))
        .snapshotChanges()
        .pipe(
            map(snaps => {
                return snaps.map(snap => {
                    return {
                        id: snap.payload.doc.id,
                        ...snap.payload.doc.data()
                    }
                })
            })
        )
    }

    addBatchActivities() {
    }

     
}