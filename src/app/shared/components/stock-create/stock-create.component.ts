import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { StockService } from '../../../contents/stock/stock.service';
import { Seed } from '../../../contents/stock/stock.model'


@Component({
    selector: 'app-stock-create',
    templateUrl: './stock-create.component.html',
    styleUrls: ['./stock-create.component.scss']
})

//https://drive.google.com/open?id=17J0usGfJyrchB22KUc1ZmoE0wDOjLU9E
//no imgurl link
export class AppStockCreateComponent implements OnInit {

    xsStyle = "{'width': '90%'}";

    public addSeedForm: FormGroup;

    constructor(public dialog: MatDialog,
        private fb: FormBuilder,
        private st: StockService,) {
    }

    ngOnInit() {
        this.addSeedForm = this.fb.group({
            name: [null, [Validators.required]],
            harvestdays: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
            isNet: null,
            meatColor: null,
            brix: null,
            texture: null,
            estWeight: null,
            total: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
            imgUrl: null
        })
    }


    onAdd() {
        const seed = new Object() as Seed;
        if(this.addSeedForm.valid) {
            const value = this.addSeedForm.value;
            if(value.total === 0){
                Object.assign(seed, value, { status: 'out of stock' });
            } else {
                Object.assign(seed, value, { status: "ready" });
            }
            this.st.addNewSeed(seed);
        }
    }

    onClose() {
        this.dialog.closeAll();
    }
}