import { Expose, Exclude } from 'class-transformer';
import * as moment from 'moment';
import { MomentFormat } from 'src/app/commons/MomentFormat';

export class EventDetailSerializer{
    @Expose()
    name:string;

    @Expose()
    description:string;

    @Expose({ toClassOnly:true })
    endtime:string;

    @Expose({ toClassOnly:true })
    starttime:string;

    @Expose()
    id:number;

    @Expose()
    get hourEnd(){
        return parseInt(moment(this.endtime).format(MomentFormat.HOUR))
    }

    @Expose()
    get minuteEnd(){
        return parseInt(moment(this.endtime).format(MomentFormat.MINUTE))
    }

    @Expose()
    get hourInit(){
        return parseInt(moment(this.starttime).format(MomentFormat.HOUR))
    }

    @Expose()
    get minuteInit(){
        return parseInt(moment(this.starttime).format(MomentFormat.MINUTE))
    }

    @Expose()
    get year(){
        return parseInt(moment(this.starttime).format(MomentFormat.YEAR))
    }

    @Expose()
    get labelMonth(){
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        const month = parseInt(moment(this.starttime).format(MomentFormat.MONTH)) - 1
        return months[month]
    }

    @Expose()
    get month(){
        const month = parseInt(moment(this.starttime).format(MomentFormat.MONTH)) - 1
        return month;
    }

    @Expose()
    get day(){
        return parseInt(moment(this.starttime).format(MomentFormat.DAY))
    }
}