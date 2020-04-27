import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormGroup, FormControl, FormGroupName } from '@angular/forms';

@Component({
    selector: 'app-product-status-dialog',
    templateUrl: './product-status-dialog.component.html'
})

export class AppProductStatusDialogComponent implements OnInit {

    selected;

    weight: number;
    brix: string;
    info: string;

    cuttedForm: FormGroup;
    soleForm: FormGroup;
    eatenForm: FormGroup;
    lostForm: FormGroup;

    formValue;

    constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public element: any) {

    }

    ngOnInit() {
      this.cuttedForm = this.fb.group({
        status: 'cutted',
        weight: this.element.weight,
      });

      this.soleForm = this.fb.group({
        status: 'sole',
        weight: this.element.weight,
        price: this.element.price,
        customer: this.element.customer,
        info: this.element.info,
      });

      this.eatenForm = this.fb.group({
        status: 'eaten',
        weight: this.element.weight,
        brix: this.element.brix,
        info: this.element.info,
      })

      this.lostForm = this.fb.group({
        status: 'lost',
        weight: this.element.weight,
        info: this.element.info,
      })
    }
}
