import { Component, Inject } from "@angular/core";
import { pollination } from "../pollination.model"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html'
})

export class DeleteDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    }
}