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
    styleUrls: ['./activities.component.scss']
})


export class AppActivitiesComponent implements OnInit {


    constructor() {}

    ngOnInit() {

    }

}