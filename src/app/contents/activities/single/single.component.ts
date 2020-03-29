import { Component, OnInit, Input } from '@angular/core'
import { Crop } from '../../pollination/crop.model'
import { Activity, Fertilizer } from '../activity.model'
import { DatePipe } from '@angular/common'
import { Helper } from '../../../shared/helper.service'
import { uiService } from '../../../shared/ui.service'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivityService } from '.././activity.service'


@Component({
    selector: "app-single-activities",
    templateUrl: './single.component.html',
    styleUrls: ['./single.component.css']
})


export class AppSingleActivitiesComponent implements OnInit {

    private _crop: Crop;
    private _docId: string;
    private activityForm: FormGroup;
    private _fertData = [];

    @Input()
    set crop(crop: Crop) {
        this._crop = crop
    }
    get crop(): Crop {
        return this._crop;
    }

    @Input()
    set docId(docId: string) {
        this._docId = docId;
    }

    get docId(): string {
        return this._docId;
    }

    constructor(private fb: FormBuilder,
        private dp: DatePipe,
        private hp: Helper,
        private as: ActivityService,
        private ui: uiService) {}

    ngOnInit() {
        this.activityForm = this.fb.group({
            category: [null, Validators.required],
            fertilizer: this.fb.group({
                formula: [null],
                amount: [null],
                unit: [null]
            }),
            // fertilizer: this.fb.array([
            //     this.addFertilizerFromGroup()
            // ]),
            description: [null],
            counter: [this.hp.dateDiff(new Date(), this._crop.toBagAt)]
        })
    }


    addFertilizer() {
        if((this.activityForm.get('fertilizer.formula').value !== null)
        && (this.activityForm.get('fertilizer.amount').value !== null)
        && (this.activityForm.get('fertilizer.unit').value !== null)) {
            this._fertData.push(this.activityForm.get(['fertilizer']).value);
            this.ui.dataMessage(`${this.activityForm.get(['fertilizer']).value.formula} was added`, 2000);
            this.activityForm.get('fertilizer').reset();
        } else {
            this.ui.dataMessage(`please fill the fertilizer field`, 2000);
        }

    }

    onFertListDelete(index: number) {
        if(this._fertData.length > 0) {
            if(this._fertData.length !== 0) {
                this.ui.dataMessage(`${this._fertData[index].formula} was removed`, 2000);
            }
            this._fertData.splice(index, 1);
        } else {
            this.ui.dataMessage(`list is empty`, 2000);
        }
    }

    // addFertilizerClick() {
    //     (<FormArray>this.activityForm.get('fertilizer')).push(this.addFertilizerFromGroup());
    // }
    // addFertilizerFromGroup(): FormGroup {
    //     return this.fb.group({
    //         formula: [null, Validators.required],
    //         amount: [null, Validators.required],
    //         unit: [null, Validators.required]
    //     })
    // }

    onSubmit() {
        const data = new Object() as Activity;
        const formValue = this.activityForm.value;
        if(this.activityForm.valid) {
            Object.assign(data, {
                cropId: this._crop.cropId,
                docId: this._docId[0],
                date: this.dp.transform(Date.now(), "yyyy-MM-dd", '+0700'),
                category: formValue.category,
                fertilizer: this._fertData,
                description: formValue.description,
                counter: formValue.counter
            });
            this.as.addActivity(data);
            this.ui.dataMessage(`activity data added successfully`, 2000);
            // (<FormArray>this.activityForm.get('fertilizer')).clear();
            // this.addFertilizerClick();
            this.activityForm.reset();
            this._fertData = [];
        } else {
            this.ui.dataMessage("Please fill all form fields", 2000);
        }
    }
}