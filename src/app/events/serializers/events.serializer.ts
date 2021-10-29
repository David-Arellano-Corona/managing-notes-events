import { Expose, Exclude } from 'class-transformer'
import * as moment from 'moment-timezone';

export class EventsSerializer{
    @Expose()
    description:string;

    @Expose()
    name:string;

    @Expose({ toClassOnly:true })
    hourEnd:number;

    @Expose({ toClassOnly:true })
    minuteEnd:number;

    @Expose({ toClassOnly:true })
    hourInit:number;

    @Expose({ toClassOnly:true })
    minuteInit:number;

    @Expose({ toClassOnly:true })
    year:number;

    @Expose({ toClassOnly:true })
    month:number;

    @Expose({ toClassOnly:true })
    day:number;

    @Expose()
    id:number;

    @Expose()
    get starttime(){
        return moment(`${this.year}-${(this.month+1).toString().padStart(2,"0")}-${this.day}T${this.hourInit}:${this.minuteInit}:00`).toISOString();
    }

    @Expose()
    get endtime(){
        return moment(`${this.year}-${(this.month+1).toString().padStart(2,"0")}-${this.day}T${this.hourEnd}:${this.minuteEnd}:00`).toISOString();
    }

}