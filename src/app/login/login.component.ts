import { Component, OnInit, NgZone, OnDestroy } from '@angular/core'
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class AppLoginComponent implements OnInit, OnDestroy {

    ui: firebaseui.auth.AuthUI;

    constructor(private afAuth: AngularFireAuth,
        private router: Router,
        private ngZone: NgZone) {}

    ngOnInit() {
        const uiConfig = {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
            }
        }

        this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
        this.ui.start('#firebaseui-auth-container', uiConfig)
    }

    onLoginSuccessful(result) {

        this.ngZone.run(() => this.router.navigateByUrl('/admin'));
    }

    ngOnDestroy() {
        this.ui.delete();
    }
}