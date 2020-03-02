import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-product-status-dialog',
    templateUrl: './product-status-dialog.component.html'
})

export class AppProductStatusDialogComponent {

    private selected;

    weight: number;
    brix: string;
    info: string;
    constructor(@Inject(MAT_DIALOG_DATA) private input: any) {

    }
}