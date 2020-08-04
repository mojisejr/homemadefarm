import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-activity-dialog',
    templateUrl: './activity-dialog.component.html',
})

export class AppActivityDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public input: any) {

    }
}