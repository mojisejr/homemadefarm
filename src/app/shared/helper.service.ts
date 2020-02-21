import { Injectable } from '@angular/core'
import { DatePipe } from '@angular/common'


@Injectable({
    providedIn: 'root',
})
export class Helper {

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
        const onedayMs = 1000*60*60*24;

        //cannot use in_date directly
        const in_dateStr = in_date.toString();
        const newDate = new Date(in_dateStr);

        

        const diff = new Date().getTime() - newDate.getTime();

        return Math.round(diff/onedayMs);
    }
}