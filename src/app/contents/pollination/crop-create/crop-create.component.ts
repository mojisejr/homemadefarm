import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Crop } from '../crop.model'
import { PollinationService } from '../pollination.service'

@Component({
    selector: 'app-crop-create',
    templateUrl: './crop-create.component.html',
    styleUrls: ['./crop-create.component.css']
})

export class CropCreateComponent implements OnInit {

    cropForm: FormGroup;

    constructor(private plService: PollinationService) {}

    ngOnInit() {
        this.cropForm = new FormGroup({
            "cropId": new FormControl(null, [Validators.required]),
            "createdAt": new FormControl(null, [Validators.required]),
        })
    }

    onSubmit() {
        if(this.cropForm.valid) {
            this.plService.addCrop(this.cropForm.value);
            this.cropForm.reset();
        }
    }
}