import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Seed } from '../../stock.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-stock-card-dialog',
    templateUrl: './stock-card-dialog.component.html',
})

export class AppStockCardDialogComponent implements OnInit {

    amount: number;
    _seed: Seed;
    editForm: FormGroup;
    constructor(private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public input: any
    ) {

    }

    ngOnInit() {
        if(this.input.seedData !== undefined) {
            this._seed = this.input.seedData;
            this.editForm = this.fb.group({
                name: this._seed.name,
                harvestdays: this._seed.harvestdays,
                estWeight: this._seed.estWeight,
                isNet: this._seed.isNet,
                meatColor: this._seed.meatColor,
                texture: this._seed.texture,
                brix: this._seed.brix,
                imgUrl: this._seed.imgUrl,
            })
        }        
    }
}