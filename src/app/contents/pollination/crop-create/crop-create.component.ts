import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Melon } from '../melon.model'
import { Crop } from '../crop.model'
import { Observable } from 'rxjs'
import { PollinationService } from '../pollination.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-crop-create',
    templateUrl: './crop-create.component.html',
    styleUrls: ['./crop-create.component.css']
})

export class CropCreateComponent implements OnInit {

    cropForm: FormGroup;
    typeList: Observable<Melon[]>;
    selectedType = [];

    constructor(private plService: PollinationService,
        private router: Router) {}

    ngOnInit() {

        this.typeList = this.plService.getMelonList().valueChanges();

        this.cropForm = new FormGroup({
            "cropId": new FormControl(null, [Validators.required]),
            "room": new FormControl(null, [Validators.required]),
            "crop": new FormControl(null, [Validators.required]),
            "material": new FormControl(null, [Validators.required, Validators.pattern("([A-Za-z0-9]:[A-Za-z0-9]:[A-Za-z0-9])")]),
            "species": new FormControl(null, [Validators.required]),
            "createdAt": new FormControl(null, [Validators.required]),
        })
    }

    onAddType() {
        
    }

    onSubmit() {
        if(this.cropForm.valid) {
            const cropData = new Object();
            const data = cropData as Crop;
            Object.assign(data, this.cropForm.value);
            console.log(data);
            this.plService.addCrop(data);
            this.router.navigate(['/products']);
        }
    }

    onReset() {
        this.cropForm.reset();
    }
}