import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
    selector: "app-pollination",
    templateUrl: "./pollination.component.html",
    styleUrls: ["./pollination.component.css"],
})

export class PollinationComponent implements OnInit {

    constructor(private afAuth: AngularFireAuth,
        private router: Router) {}

    ngOnInit() {
        this.afAuth.authState.subscribe(state => {
            if(state == null) {
                this.router.navigateByUrl('/');
            }
        })
    }
}