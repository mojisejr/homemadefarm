import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'


@Injectable({
    providedIn: 'root',
})
export class uiService {
    constructor(private snackbar: MatSnackBar) {}
    dataMessage(message, duration) {
        this.snackbar.open(`Data: ${message} added successfully`, null, {
            duration: duration,
        })
    }
}