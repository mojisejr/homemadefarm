import { Component, OnInit, Input } from '@angular/core'
import { Crop } from '../pollination/crop.model'
import { Activity, Fertilizer } from './activity.model'
import { DatePipe } from '@angular/common'
import { Helper } from '../../shared/helper.service'
import { uiService } from '../../shared/ui.service'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivityService } from './activity.service'


@Component({
    selector: "app-activities",
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.css']
})


export class AppActivitiesComponent implements OnInit {

    private _crop: Crop;
    private _docId: string;
    private activityForm: FormGroup;

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
            cropId: [this._crop.cropId],
            docId: this.docId,
            date: [this.dp.transform(Date.now(), "yyyy-MM-dd", '+0700')],
            category: [null, Validators.required],
            fertilizer: this.fb.array([
                this.addFertilizerFromGroup()
            ]),
            description: [null],
            counter: [this.hp.dateDiff(new Date(), this._crop.toBagAt)]
        })
    }

    addFertilizerClick() {
        (<FormArray>this.activityForm.get('fertilizer')).push(this.addFertilizerFromGroup());
    }
    addFertilizerFromGroup(): FormGroup {
        return this.fb.group({
            formula: [null, Validators.required],
            amount: [null, Validators.required],
            unit: [null, Validators.required]
        })
    }

    onSubmit() {
        if(this.activityForm.valid) {
            this.as.addActivity(this.activityForm.value);
            (<FormArray>this.activityForm.get('fertilizer')).clear();
            this.addFertilizerClick();
            this.activityForm.reset();
        } else {
            this.ui.dataMessage("Please fill all form fields", 2000);
        }
    }
}