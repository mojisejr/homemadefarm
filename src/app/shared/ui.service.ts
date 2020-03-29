import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { AppConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'
import { AppProductStatusDialogComponent } from './components/product-status-dialog/product-status-dialog.component'
import { AppDatepickerDialogComponent } from './components/datepicker-dialog/datepicker-dialog.component'
import { AppActivityDialogComponent } from './components/activity-dialog/activity-dialog.component'


@Injectable({
    providedIn: 'root',
})
export class uiService {
    constructor(private snackbar: MatSnackBar,
        private dialog: MatDialog) {}
    dataMessage(message, duration) {
        this.snackbar.open(`Data: ${message}`, null, {
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

    showDatePickerDialog() {
        const dialogRef = this.dialog.open(AppDatepickerDialogComponent)
        return dialogRef;
    }

    showActivityDetailsDialog(element) {

        //category: "embeded"
        // ​
        // counter: 2
        // ​
        // cropId: "r3c22020"
        // ​
        // date: "2020-03-19"
        // ​
        // description: "TEST"
        // ​
        // docId: "Tfq43ILCWaor7q45hlFe"
        // ​
        // fertilizer: (1) […]
        // ​​
        // 0: Object { amount: 5, formula: "12-12-17", unit: "g" }
        // ​​
        // length: 1
        // ​​
        // <prototype>: Array []
        // ​
        // id: "zIWDdlY7TZ6Y6dIiCegx"
        const dialogRef = this.dialog.open(AppActivityDialogComponent, {
            data: {
                ...element
            }
        })

        return dialogRef;
    }
}