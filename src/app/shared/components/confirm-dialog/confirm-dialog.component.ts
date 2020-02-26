import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})

export class AppConfirmDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) private input: any) {

    }
}