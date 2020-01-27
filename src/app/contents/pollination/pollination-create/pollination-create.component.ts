import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { PollinationService } from '../pollination.service'
import { pollination } from '../pollination.model'
import { Crop } from '../crop.model'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
    selector: 'app-pollination-create',
    templateUrl: './pollination-create.component.html',
    styleUrls: ['./pollination-create.component.css']
})

export class PollinationCreateComponent implements OnInit {
    pollinationForm: FormGroup;
    cropsList: Crop[] = [];

    constructor(private plService: PollinationService, private snackbar: MatSnackBar ) {}

    ngOnInit() {
        this.pollinationForm = new FormGroup({
            "cropId": new FormControl(null, [Validators.required]),
            "tagColor": new FormControl(null, [Validators.required]),
            "createdAt": new FormControl(null, [Validators.required]),
        })

        this.plService.cropsRef.valueChanges().subscribe(data => {
            this.cropsList = data;
        })
    }

    onSubmit() {
        if(this.pollinationForm.valid) {
            this.plService.addPollination(this.pollinationForm.value);
            this.snackbar.open(`Crop: ${ this.pollinationForm.value.cropId } was successfully created!`, null, { duration: 2000 });
            this.pollinationForm.reset();
        } else {
            this.snackbar.open(`Something went wrong.. try again`, null, { duration: 2000 });
        }
    }
}