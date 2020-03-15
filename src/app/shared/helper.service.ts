import { Injectable } from '@angular/core'
import { DatePipe } from '@angular/common'


@Injectable({
    providedIn: 'root',
})
export class Helper {

    private _oneDayMs = 1000*60*60*24;

    constructor(private dp: DatePipe) {}

    estHarvestCalc(createdAt: Date, harvestday: number) {
        const onedayMs = 1000*60*60*24;

        //cannot use in_date directly
        const createdAt_str = createdAt.toString();
        const createdAt_ms= new Date(createdAt_str).getTime();

        const harvestday_ms = harvestday * onedayMs;

        

        return this.dp.transform(new Date(createdAt_ms + harvestday_ms), "yyyy-MM-dd");
    }

    diffTilNow (in_date: Date) {
        //cannot use in_date directly
        const in_dateStr = in_date.toString();
        const newDate = new Date(in_dateStr);

        

        const diff = new Date().getTime() - newDate.getTime();

        return Math.round(diff/this._oneDayMs);
    }

    dateDiff(date1: Date, date2: Date) {
        const strDate1 = date1.toString();
        const strDate2 = date2.toString();

        const newDate1 = new Date(strDate1);
        const newDate2 = new Date(strDate2);

        const diff = newDate1.getTime() - newDate2.getTime();

        return Math.round(diff/this._oneDayMs);
    }
}