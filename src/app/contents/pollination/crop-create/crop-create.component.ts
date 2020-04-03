import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Melon } from '../melon.model'
import { Crop } from '../crop.model'
import { Observable, from } from 'rxjs'
import { PollinationService } from '../pollination.service'
import { Router } from '@angular/router'
import { uiService } from '../../../shared/ui.service'
import { map } from 'rxjs/operators';
import { Seed } from '../../stock/stock.model';

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
        private router: Router,
        private ui: uiService) {}

    ngOnInit() {

        this.typeList = this.plService.getMelonList().valueChanges();

        this.cropForm = new FormGroup({
            "cropId": new FormControl(null, [Validators.required]),
            "room": new FormControl(null, [Validators.required]),
            "crop": new FormControl(null, [Validators.required]),
            "material": new FormControl(null, [Validators.required, Validators.pattern("([A-Za-z0-9]:[A-Za-z0-9]:[A-Za-z0-9])")]),
            "speciesForm": new FormGroup({
                "species" : new FormControl(null),
                "total" : new FormControl(null),
            }),
            "createdAt": new FormControl(null, [Validators.required]),
        })
    }

    onAddType() {
        if((this.cropForm.get('speciesForm.species').value !== null) &&
        (this.cropForm.get('speciesForm.total').value !== null)) {
            if(this.cropForm.get('speciesForm.species').value['total'] > 0) {
                this.selectedType.push({
                    "species": this.cropForm.get('speciesForm.species').value['name'],
                    "total": this.cropForm.get('speciesForm.total').value,
                    "left": (this.cropForm.get('speciesForm.species').value['total']) - (this.cropForm.get('speciesForm.total').value) 
                });
            } else {
                this.ui.dataMessage(`${this.cropForm.get('speciesForm.species').value['name']} is out of stock`, 2000);
            }
        } else {
            this.ui.dataMessage('please fill all species data', 2000);
        }
    }

    onRemove(i: number) {
        if(this.selectedType.length > 0) {
            if(this.selectedType.length !== 0) {
                this.ui.dataMessage(`${this.selectedType[i].species} was removed`, 2000);
            }
            this.selectedType.splice(i, 1);
        } else {
            this.ui.dataMessage(`list is empty`, 2000);
        }
    }

    onSubmit() {
        // if(this.cropForm.valid) {
        //     const cropData = new Object();
        //     const data = cropData as Crop;
        //     Object.assign(data, this.cropForm.value);
        //     console.log(data);
        //     this.plService.addCrop(data);
        //     this.router.navigate(['/products']);
        // }
        const form = this.cropForm.value;
        const cropData = new Object() as Crop;
        if(((form.cropId && 
            form.room && 
            form.crop && 
            form.material && 
            form.createdAt) !== null) &&
        this.selectedType.length > 0) {
            Object.assign(cropData, {
                cropId: form.cropId,
                room: form.room,
                crop: form.crop,
                material: form.material,
                species: this.selectedType,
                createdAt: form.createdAt,
                status: "initial"
            })

            if(this.plService.addNewCrop(cropData, this.selectedType)) {
                this.ui.dataMessage(`${cropData.room} | ${cropData.crop} created successfully`, 2000);
                this.router.navigate(['/products']);
            } else {
                this.ui.dataMessage(`${cropData.room} | ${cropData.crop} created failed`, 2000);
                this.cropForm.reset();
            }
        } else {
            this.ui.dataMessage('please fullfill the required field', 2000);
        }
    }

    onReset() {
        this.cropForm.reset();
    }

    
}