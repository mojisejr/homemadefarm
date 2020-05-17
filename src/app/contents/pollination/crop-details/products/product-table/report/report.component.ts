import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class AppReportComponent implements OnInit {

  _datasource: MatTableDataSource<Product>;
  avgWeight: any;
  netWeight: any;
  counter: any;
  aaa: any;

  @Input()
  set datasource(datasource: MatTableDataSource<Product>) {
    this._datasource = datasource;
  }

  constructor() {}

  ngOnInit() {
    if(this.dataValidation()) {
      this.avgWeight = this.calcAvgWeight();
      this.netWeight = this.calcSumWeight();
      this.counter = this._datasource.data.length;
      this.aaa = this.gradeSorting();
    } else {
      this.avgWeight = "ยังชั่งไม่ครบ";
      this.netWeight = "ยังชั่งไม่ครบ";
      this.counter = this._datasource.data.length;
      this.aaa = this.gradeSorting();
    }
  }

  dataValidation() {
    var buff = this._datasource.data.filter(data => {
      return data.weight === 'na' || !data.weight;
    });
    if(buff.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  calcSumWeight() {
    return this._datasource.data.map(t => t.weight).reduce((sum, current) => sum + current, 0);
  }

  calcAvgWeight() {
    const legnth = this._datasource.data.length;
    const avg = this.calcSumWeight() / legnth;
    return avg;
  }

  gradeSorting() {
    var grade = this._datasource.data.filter(data => {
      return data.grade !== 'a'
    })
    return grade.length;
  }
}
