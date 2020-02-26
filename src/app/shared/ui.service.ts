import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { AppConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'
import { AppProductStatusDialogComponent } from './components/product-status-dialog/product-status-dialog.component'


@Injectable({
    providedIn: 'root',
})
export class uiService {
    constructor(private snackbar: MatSnackBar,
        private dialog: MatDialog) {}
    dataMessage(message, duration) {
        this.snackbar.open(`Data: ${message} added successfully`, null, {
            duration: duration,
        })
    }

    showConfirmDialog(id, header: string = "Are you sure ?", content: string = "") {
        if(id != null) {
            const dialogRef = this.dialog.open(AppConfirmDialogComponent, {
                data: {
                    id: id,
                    dialogHeader: header,
                    dialogContent: content
                }
            });

            return dialogRef;
        } 
    }
    showProductUpdateStatusDialog(element) {
        if(element != null) {
            const dialogRef = this.dialog.open(AppProductStatusDialogComponent, {
                data: {
                    id: element.id,
                    row: element.row
                }
            });

            return dialogRef;
        } 
    }
}