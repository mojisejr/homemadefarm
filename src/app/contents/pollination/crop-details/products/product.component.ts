import { Component, OnInit, Input } from '@angular/core'
import { Crop } from '../../crop.model'
import { pollination } from '../../pollination.model'
import { Product } from '../../product.model'
import { Observable } from 'rxjs'
import { DatePipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PollinationService } from '../../pollination.service'

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    private _crop: Crop;
    private _cropId: string;
    private pollination$: Observable<pollination[]>;

    productForm: FormGroup;

    columns: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];

    //GET SET INPUT
    @Input()
    set crop(crop: Crop) {
        this._crop = crop;
    }
    get crop(): Crop { return this._crop; }

    @Input()
    set cropId(cropId: string) {
        this._cropId = cropId;
    }
    get cropId(): string { return this._cropId }

    ///------


    constructor(private ps: PollinationService,
        private dp: DatePipe) {

    }
    ngOnInit() {

        this.pollination$ = this.ps.getTagColorById(this._cropId);
        this.productForm = new FormGroup({
            "row": new FormControl(null, [Validators.required]),
            "grade": new FormControl(null, [Validators.required]),
            "species": new FormControl(null, [Validators.required]),
            "tagColor": new FormControl(null, [Validators.required]),
        })
    }

    onSubmit() {
        const data = new Object();
        const productData = data as Product;
        if(this.productForm.valid) {
            // data from Form
            // - row
            // - grade
            // - type
            // - tagColor
            Object.assign(productData, this.productForm.value, {
                createdAt: this.dp.transform(new Date, "yyyy-MM-dd"),
                cropId: this._cropId
            })
            console.log(productData);
        }
    }
}