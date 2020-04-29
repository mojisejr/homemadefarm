import { Component, OnInit, Input } from '@angular/core';
import { Crop } from '../../crop.model';
import { PollinationService } from '../../pollination.service';
import { Product } from '../../product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class AppReportComponent implements OnInit {
  _crop: Crop;
  _id: String;
  _productData$: Observable<Product[]>;

  @Input()
  set crop(crop: Crop) {
    this._crop = crop;
  }

  @Input()
  set docId(docId: String) {
    this._id = docId;
  }

  constructor(private ps: PollinationService) {}

  ngOnInit() {
    this._productData$ = this.getProductSnapshot();
    if(this._productData$ !== null) {
      this.calcTotalWeight();
    }
  }

  getProductSnapshot(): Observable<Product[]> {
    return this.ps.getProductByCropId(this._id).pipe(
        map(snaps => {
            return snaps.map(snap => {
                return <Product> {
                    id: snap.payload.doc.id,
                    ...snap.payload.doc.data()
                }
            })
        })
    )
  }

  calcTotalWeight() {
    this._productData$.subscribe(data => {
     var totalWeight = data.map(t => t.weight).reduce((sum, current) => sum + current, 0);
     console.log(totalWeight);
    });
  }
}
