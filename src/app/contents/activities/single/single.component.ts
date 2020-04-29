import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Crop } from '../../pollination/crop.model'
import { Activity, Fertilizer } from '../activity.model'
import { DatePipe } from '@angular/common'
import { Helper } from '../../../shared/helper.service'
import { uiService } from '../../../shared/ui.service'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivityService } from '.././activity.service'
import { Subscription } from 'rxjs';


@Component({
    selector: "app-single-activities",
    templateUrl: './single.component.html',
    styleUrls: ['./single.component.scss']
})


export class AppSingleActivitiesComponent implements OnInit, OnDestroy {
    fertSub: Subscription;
    fertCount: Number;
    embedSub: Subscription;
    embedCount: Number;
    spraySub: Subscription;
    sprayCount: Number;

    _crop: Crop;
    _docId: string;
    activityForm: FormGroup;
    _fertData = [];

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
            // counter: [this.hp.dateDiff(new Date(), this._crop.toBagAt)] || null
        });
        this.displayDataOnCard();
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
                counter: [this.hp.dateDiff(new Date(), this._crop.toBagAt)]
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

    displayDataOnCard() {
      this.fertSub = this.as.subFertSum.subscribe(data => {
        this.fertCount = data;
      });
      this.embedSub = this.as.subEmbedSum.subscribe(data => {
        this.embedCount = data;
      });
      this.spraySub = this.as.subSpraySum.subscribe(data => {
        this.sprayCount = data;
      })
    }

    ngOnDestroy() {
      this.fertSub.unsubscribe();
      this.embedSub.unsubscribe();
      this.spraySub.unsubscribe();
    }
}
