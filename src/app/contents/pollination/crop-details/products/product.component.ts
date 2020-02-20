import { Component, OnInit, Input } from '@angular/core'
import { Crop } from '../../crop.model'
import { pollination } from '../../pollination.model'
import { Observable } from 'rxjs'
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

    constructor(private ps: PollinationService) {

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
        
    }
}