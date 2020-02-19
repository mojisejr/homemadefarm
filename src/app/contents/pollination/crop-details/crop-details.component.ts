import { Component, OnInit} from '@angular/core'
import { Melon } from '../melon.model'
import { pollination } from '../pollination.model'
import { Crop } from '../crop.model'
import { PollinationService } from '../pollination.service'
import { ActivatedRoute } from '@angular/router'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { DatePipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialogComponent } from './confirm-dialog.component'


@Component({
    selector: 'app-crop-details',
    templateUrl: './crop-details.component.html',
    styleUrls: ['./crop-details.component.css']
})

export class CropDetailsComponent implements OnInit {

    melon: Melon[];
    types: Observable<pollination[]>;
    // all$: Observable<{types: pollination[], melon: Melon}>;
    all$: Observable<any>;
    docId = null;
    cropDetails: Observable<Crop>;


    toTrayForm: FormGroup;
    toBagForm: FormGroup;
    tagCreateForm: FormGroup;



    displayedColumns = ['tagColor', 'createdAt', 'currentDay', 'dayLeft', 'estHarvestDate', 'actions'];

    constructor(private ps: PollinationService,
        private route: ActivatedRoute,
        private dp: DatePipe,
        public confirmDialog: MatDialog) {}

    ngOnInit() {
        this.route.params.subscribe(id => {
            this.docId = id['id'];
        })
        if(this.docId != null) {
            this.cropDetails = this.ps.getCropById(this.docId);
        }

        this.toTrayForm = new FormGroup({
            "toTrayAt": new FormControl(null, [Validators.required])
        })

        this.toBagForm = new FormGroup({
            "toBagAt": new FormControl(null, [Validators.required])
        })
        this.tagCreateForm = new FormGroup({
            "tagColor": new FormControl(null, [Validators.required])
        })
    }

    // onTypeSelectionChange({ value }) {
    //     if(value != null && this.docId != null) {
    //         this.all$ = combineLatest(
    //             this.ps.getTagColorById(this.docId),
    //             this.ps.getMelonById(value)
    //         ).pipe(
    //             map(([types, melon]) => {
    //                 return types.map(type => {
    //                     return {
    //                         ...type,
    //                         currentDay: this.diffTilNow(type.createdAt), 
    //                         estHarvestDate: this.estHarvestCalc(type.createdAt, melon.harvestdays),
    //                         dayLeft: melon.harvestdays - this.diffTilNow(type.createdAt)
    //                     }
    //                 })
    //             })
    //         )
    //     }
    // }

    onTypeSnapshotChange({ value }) {
        if(value != null && this.docId != null) {
            this.all$ = combineLatest(
                this.ps.getTagColorByIdSnapshot(this.docId).snapshotChanges(),
                this.ps.getMelonById(value)
            ).pipe(map(([types, melon]) => {
                return types.map(d => {
                    const types = d.payload.doc.data();
                    const type_id = d.payload.doc.id;
                    const currentDay = this.diffTilNow(d.payload.doc.data()['createdAt']);
                    const estHarvestDate = this.estHarvestCalc(d.payload.doc.data()['createdAt'], melon.harvestdays);
                    const dayLeft = melon.harvestdays - this.diffTilNow(d.payload.doc.data()['createdAt']);
                    return {
                        typeId: type_id,
                        ...types,
                        currentDay: currentDay,
                        estHarvestDate: estHarvestDate,
                        dayLeft: dayLeft
                    }
                })
            }))
        }
    }

    onUpdate() {
        if(this.toTrayForm.valid) {
            const value = new Object();
            Object.assign(value, this.toTrayForm.value, {status: "toTray"})
            this.ps.updateDetail(this.docId, value, "UPDATE_CROP_DETAIL").then(result => {
                console.log("toTrayAdding Done");
                //TODO: ADD CONFIRM DIALOG ? SNACKBAR
            })
            .catch(err => {
                console.log("onTS toTray error");
                console.error(err);
                //TODO: ERROR HANDLING
            })
        }
        if(this.toBagForm.valid) {
            const value = new Object();
            Object.assign(value, this.toBagForm.value, {status: "toBag"})
            console.log(value);
            this.ps.updateDetail(this.docId, value, "UPDATE_CROP_DETAIL").then(result => {
                console.log("toBagAdding Done");
                //TODO: ADD CONFIRM DIALOG ? SNACKBAR
            })
            .catch(err => {
                console.log("onTS toBag error");
                console.error(err);
                //TODO: ERROR HANDLING
            })
        }
    }

    onTagCreate() {
        const value = new Object();
        Object.assign(value, this.tagCreateForm.value,
            { 
                docId: this.docId,
                createdAt: this.dp.transform(new Date(), "yyyy-MM-dd")
            } 
        );
        if(this.tagCreateForm.valid) {
            this.ps.addPollination(value).then(result => {
                if(result) {
                    this.ps.updateCropStatus(this.docId, 'pollination').then(result => {
                        console.log("status updated done");
                    })
                    .catch(err => {
                        console.error(err);
                    })
                }
            })
        }
    }

    onTagDelete(typeId) {
        if(typeId != null) {
            const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
                data: {
                    id: typeId,
                    dialogHeader: "Are you sure ?",
                    dialogContent: ""
                }
            })

            dialogRef.afterClosed().subscribe(typeId => {
                if(typeId != null) {
                    this.ps.deleteTag(typeId);
                }
            })
        }
    }

    onFinish() {
        const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
            data: {
                id: this.docId,
                dialogHeader: "Finish Pollination Phase",
                dialogContent: "Do you want to finish the pollination phase now ?"
            }
        })

        dialogRef.afterClosed().subscribe(docId => {
            if(docId) {
                this.ps.updateDetail(docId, {status: 'postPollination'}, 'UPDATE_CROP_DETAIL');
            }
        })
    }

    //helper class
    estHarvestCalc(createdAt: Date, harvestday: number) {
        const onedayMs = 1000*60*60*24;

        //cannot use in_date directly
        const createdAt_str = createdAt.toString();
        const createdAt_ms= new Date(createdAt_str).getTime();

        const harvestday_ms = harvestday * onedayMs;

        

        return this.dp.transform(new Date(createdAt_ms + harvestday_ms), "yyyy-MM-dd");
    }

    diffTilNow (in_date: Date) {
        const onedayMs = 1000*60*60*24;

        //cannot use in_date directly
        const in_dateStr = in_date.toString();
        const newDate = new Date(in_dateStr);

        

        const diff = new Date().getTime() - newDate.getTime();

        return Math.round(diff/onedayMs);
    }
}
