import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivityService } from '../activity.service'
import { Helper } from '../../../shared/helper.service'
import { DatePipe } from '@angular/common'
import { Crop } from '../../pollination/crop.model';
import { uiService } from '../../../shared/ui.service'
import { Activity } from '../activity.model'

@Component({
    selector: 'app-multi-activity',
    templateUrl: './multi.component.html',
    styleUrls: ['./multi.component.css']
})

export class AppMultiActivitiesComponent implements OnInit {
    private activityForm: FormGroup;
    private _crop: Crop;
    private _fertData = [];
    private _docId;

    @Input()
    set croplist(croplist: Crop) {
        this._crop = croplist;
    }

    constructor(private ui: uiService,
        private dp: DatePipe,
        private hp: Helper,
        private as: ActivityService) {}

    ngOnInit() {
        this.activityForm = new FormGroup({
            'docId': new FormControl(null, [Validators.required]),
            'category': new FormControl(null, [Validators.required]),
            'fertilizer': new FormGroup({
                "formula": new FormControl(null, [Validators.required]),
                "amount": new FormControl(null, [Validators.required]),
                "unit": new FormControl(null, [Validators.required]),
            }),
            'description': new FormControl(null, [Validators.required])
        })
    }

    onSubmit() {
        // console.log(this.activityForm.value);
        if(this._fertData.length > 0  &&
            this.activityForm.get('docId').value != null &&
            this.activityForm.get('category').value != null &&
            this.activityForm.get('description').value != null) {
            const formValue = this.activityForm.value;
            const obj = new Object() as Activity;
            (this.activityForm.get('docId').value as any[]).forEach(data => {
                Object.assign(obj,{
                    docId: data.id,
                    category: formValue.category,
                    date: this.dp.transform(Date.now(), "yyyy-MM-dd", '+0700'),
                    cropId: data.cropId,
                    fertilizer: this._fertData,
                    description: formValue.description,
                    counter: this.hp.dateDiff(new Date(), data.toBagAt)
                })
                this.as.addActivity(obj);
            })
        } else {
            this.ui.dataMessage("please fullfill all of the data", 2000);
        }
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
}
