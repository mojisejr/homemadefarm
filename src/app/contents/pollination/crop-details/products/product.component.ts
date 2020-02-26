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
    addLoaded = true;
    sorted = false;

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
            // Validators.pattern('[A-Z][0-9]+')
            "row": new FormControl(null, [Validators.required, Validators.pattern('[A-Z]'), Validators.max(1)]),
            "rowNumber": new FormControl(1, [Validators.required, Validators.min(1)]),
            "grade": new FormControl(null, [Validators.required]),
            "species": new FormControl(null, [Validators.required]),
            "tagColor": new FormControl(null, [Validators.required]),
        })
    }

    onSubmit() {
        const data = new Object();
        const productData = data as Product;
        const row = this.productForm.value['row'] + this.productForm.value['rowNumber']
        const formValue = this.productForm.value;
        this.ps.getEstHarvestDate(formValue.species, this._cropId, formValue.tagColor).subscribe(estHarvestDate =>{
            if(this.productForm.valid) {
                this.addLoaded = false;
                // data from Form
                // - row
                // - grade
                // - type
                // - tagColor
                Object.assign(productData, {
                    createdAt: this.dp.transform(new Date, "yyyy-MM-dd"),
                    cropId: this._cropId,
                    row: row,
                    tagColor: formValue.tagColor,
                    species: formValue.species,
                    grade: formValue.grade,
                    estHarvestDate: estHarvestDate,
                })
                if(productData != null) {
                    this.ps.addProduct(productData).then(result => {
                        this.ui.dataMessage(formValue.row, 2000);
                        if(result) {
                            this.addLoaded = true;
                        }
                    })
                }
            }
        })
        
    }

    stepUp(input: number, event) {
        event.preventDefault();
        this.productForm.controls['rowNumber'].setValue(this.productForm.controls['rowNumber'].value + 1);
    }

    stepDown(input: number, event) {
        event.preventDefault();
        if(this.productForm.controls['rowNumber'].value > 1){
            this.productForm.controls['rowNumber'].setValue(this.productForm.controls['rowNumber'].value - 1);
        } else if (this.productForm.controls['rowNumber'].value == 0) {
            this.productForm.controls['rowNumber'].setValue(1);
        }
    }

    onSorted() {
        if(this.sorted === true && this._crop != null && this._crop.status === 'postPollination') {
            this.ps.updateCropStatus(this._cropId, "Harvesting")
            .then(res => {
                this.ui.dataMessage(`Updated! status: ${this._crop.status }`, 2000);
            })
            .catch(err => {
                this.ui.dataMessage(`Error!  status: ${this._crop.status }`, 2000);
            })
        }
    }
}