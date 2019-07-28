import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'wfmMoment'
})

export class  MomentPipe implements PipeTransform{
    transform(value: string, formaFrom: string, formatTo='DD.MM.YYYY'): string {
       return moment(value, formaFrom).format(formatTo);
    }

    
}
