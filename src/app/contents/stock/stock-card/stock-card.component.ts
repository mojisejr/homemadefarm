import { Component, OnInit, Input } from '@angular/core'
import { Seed } from '../stock.model';
import { Helper } from '../../../shared/helper.service'
import { MatDialog } from '@angular/material/dialog'
import { AppStockCardDialogComponent } from './stock-card-dialog/stock-card-dialog.component'
import { StockService } from '../stock.service'
import { uiService } from '../../../shared/ui.service'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'app-stock-card',
    templateUrl: './stock-card.component.html',
    styleUrls: ['./stock-card.component.scss']
})

export class AppStockCardComponent implements OnInit {

    private _seed: Seed;

    @Input()
    set seed(seed: Seed) {
        this._seed = seed;
    }
    constructor(private hp: Helper,
        private dialog: MatDialog,
        private stock: StockService,
        private ui: uiService) {}

    ngOnInit() {
        if(this._seed.imgUrl === null || this._seed.imgUrl === "") {
            this._seed.imgUrl = this.hp.googleDriveUrlToDisplayImageUrl("https://drive.google.com/open?id=17J0usGfJyrchB22KUc1ZmoE0wDOjLU9E");
        }
    }

    onAdd() {
        const dialogRef = this.dialog.open(AppStockCardDialogComponent, {
            data: {
                isFor: "add"
            }
        })

        dialogRef.afterClosed().subscribe(amount => {
            if(amount > 0 && amount != null) {
                const currentTotal = this._seed.total;
                const latestTotal = currentTotal + amount;
                this.stock.updateTotalSeed(this._seed.name, latestTotal).subscribe(result => {
                    if(result) {
                        this.ui.dataMessage(`${this._seed.name} added ${latestTotal} seeds`, 2000);
                    } else {
                        this.ui.dataMessage(`${this._seed.name} added failed`, 2000);
                    }
                })
            }
        })
    }

    onEdit() {
        const dialogRef = this.dialog.open(AppStockCardDialogComponent, {
            data: {
                isFor: "edit",
                seedData: this._seed,
            }
        })

        dialogRef.afterClosed().subscribe(updateData => {
            if((<FormGroup>updateData).dirty) {
                console.log(updateData.value);
                this.stock.updateSeedInfo(updateData.value).subscribe(result => {
                    if(result) {
                        this.ui.dataMessage(`${updateData.get('name').value} updated successfully`, 2000);
                    } else {
                        this.ui.dataMessage(`${updateData.get('name').value} updated failed try again`, 2000);
                    }
                });
            } else {
                this.ui.dataMessage('Nothing Changed', 2000);
            }
        })
    }

    onTake() {
        if(this._seed.total !== 0) {
            const dialogRef = this.dialog.open(AppStockCardDialogComponent, {
                data: {
                    isFor: "take"
                }
            })
    
            dialogRef.afterClosed().subscribe(amount => {
                if(this._seed.total !== 0 && amount != false && this._seed.total > amount) {
                    const left = this._seed.total - amount;
                    this.stock.updateTotalSeed(this._seed.name, left).subscribe(result => {
                        if(result) {
                            this.ui.dataMessage(`${this._seed.name} -> ${left} seeds taken`, 2000);
                        } else {
                            this.ui.dataMessage(`${this._seed.name} added failed`, 2000);
                        }
                    })
                } else if(this._seed.total !== 0 && amount != false && this._seed.total < amount){
                    this.ui.dataMessage(`${this._seed.name} has not enough to take`, 2000);
                } 
            })
        } else {
            this.ui.dataMessage(`${this._seed.name} has not enough to take`, 2000);
        }
    }

    // onDelete() {
    //     const dialogRef = this.dialog.open(AppStockCardDialogComponent, {
    //         data: {
    //             isFor: "delete"
    //         }
    //     })
    // }
    
}