import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-seed-create-dialog',
    templateUrl: './seed-create.component.html',
})

export class AppActivityDialogComponent implements OnInit {

    private seedForm: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) private input: any) {

    }

    ngOnInit() {
        this.seedForm = new FormGroup({
            "name": new FormControl(null, [Validators.required]),
            "isNet": new FormControl(null),
            "meatColor": new FormControl(null),
            "estWeight": new FormControl(null),
            "brix": new FormControl(null),
            "harvestdays": new FormControl(null, [Validators.required]),
            "imgUrl": new FormControl(null),
            "total": new FormControl(null, [Validators.required])
        })
    }
}