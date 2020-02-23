import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import 'firebase/database'

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    constructor(private fb: AngularFireDatabase) {}

    getRtbDataByRoom(room: string) {
        return this.fb.list(room).valueChanges().subscribe(result => {
            if(result) {
                console.log("result: ")
                console.log(result);
            }
        })
    }
}