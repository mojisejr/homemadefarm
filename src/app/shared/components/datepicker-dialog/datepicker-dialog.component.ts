import { Component, Inject } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-datepicker-dialog',
    templateUrl: './datepicker-dialog.component.html'
})

export class AppDatepickerDialogComponent {


    date: any;
    
    constructor(@Inject(MAT_DIALOG_DATA) public input: any) {}
}