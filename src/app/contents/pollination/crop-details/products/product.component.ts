import { Component, OnInit, Input } from '@angular/core'
import { Crop } from '../../crop.model'
import { pollination } from '../../pollination.model'
import { Product } from '../../product.model'
import { Melon } from '../../melon.model'
import { Observable } from 'rxjs'
import { DatePipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PollinationService } from '../../pollination.service'
import { uiService } from '../../../../shared/ui.service'

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    private _crop: Crop;
    private _cropId: string;
    private pollination$: Observable<pollination[]>;
    private melon: Melon;

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
        private dp: DatePipe,
        private ui: uiService
        ) {

    }
    ngOnInit() {

        this.pollination$ = this.ps.getTagColorById(this._cropId);
        this.productForm = new FormGroup({
            "row": new FormControl(null, [Validators.required, Validators.pattern('[A-Z][0-9]+')]),
            "grade": new FormControl(null, [Validators.required]),
            "species": new FormControl(null, [Validators.required]),
            "tagColor": new FormControl(null, [Validators.required]),
        })
    }

    onSubmit() {
        const data = new Object();
        const productData = data as Product;
        const formValue = this.productForm.value;
        
        this.ps.getEstHarvestDate(formValue.species, this._cropId, formValue.tagColor).subscribe(estHarvestDate =>{
            if(this.productForm.valid) {
                // data from Form
                // - row
                // - grade
                // - type
                // - tagColor
                Object.assign(productData, this.productForm.value, {
                    createdAt: this.dp.transform(new Date, "yyyy-MM-dd"),
                    cropId: this._cropId,
                    estHarvestDate: estHarvestDate,
                })
                if(productData != null) {
                    this.ps.addProduct(productData).then(result => {
                        this.ui.dataMessage(formValue.row, 2000);
                    })
                }
            }
        })
        
    }
}