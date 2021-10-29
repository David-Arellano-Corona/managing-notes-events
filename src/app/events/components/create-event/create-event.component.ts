import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { testValidator } from '../../../commons/validators/eventtime.validator';
import { serialize } from '../../../commons/serializer';
import { EventsSerializer } from '../../serializers';
import { EventDetailDto, EventDto } from '../../dto';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  @Output() o_back = new EventEmitter();
  @Output() o_createEvent = new EventEmitter();
  @Input() i_year?:number;
  @Input() i_month?:number;
  @Input() i_day?:number;
  @Input() i_labelMonth?:string;
  @Input() i_eventDetail?:EventDetailDto;

  eventTimeError = ""

  eventForm = new FormGroup({
    name:new FormControl("",[Validators.required]),
    description: new FormControl(""),
    hourInit: new FormControl("",[Validators.required, Validators.min(1), Validators.max(23)]),
    minuteInit: new FormControl("",[Validators.required, Validators.min(0), Validators.max(59)]),
    hourEnd: new FormControl("",[Validators.required, Validators.min(1), Validators.max(24)]),
    minuteEnd: new FormControl("",[Validators.required, Validators.min(0), Validators.max(59)])
  },{
    validators:[testValidator()]
  })

  faArrowLeft = faArrowLeft

  constructor() { }

  ngOnInit(): void {
    if(this.i_eventDetail) this.initEventForm(this.i_eventDetail)
  }

  initEventForm(event:EventDetailDto){
    this.eventForm.get('name')!.setValue(event.name);
    this.eventForm.get('description')!.setValue(event.description);
    this.eventForm.get('hourInit')!.setValue(event.hourInit);
    this.eventForm.get('minuteInit')!.setValue(event.minuteInit);
    this.eventForm.get('hourEnd')!.setValue(event.hourEnd);
    this.eventForm.get('minuteEnd')!.setValue(event.minuteEnd)
    this.i_year = event.year;
    this.i_labelMonth = event.labelMonth;
    this.i_day = event.day;
    this.i_month = event.month;
  }

  back(){
    this.o_back.emit()
  }

  createEvent(){
    const isToUpdateEvent = this.i_eventDetail?.id;
    if(isToUpdateEvent){
      this.updateEvent()
    }else{
      const event = serialize<EventDto>(
        {...this.eventForm.value, year:this.i_year, month: this.i_month, day: this.i_day},
        EventsSerializer
      ) 
      this.o_createEvent.emit(event)    
    }
    
  }

  private updateEvent(){
    const event = serialize<EventDto>(
      {...this.eventForm.value, year:this.i_year, month: this.i_month, day: this.i_day, id: this.i_eventDetail?.id},
      EventsSerializer
    ) 
    this.o_createEvent.emit(event)    
  }  

  get hourInit(){
    return this.eventForm.controls['hourInit']
  }
  get minuteInit(){
    return this.eventForm.controls['minuteInit']
  }
  get hourEnd(){
    return this.eventForm.controls['hourEnd']
  }
  get minuteEnd(){
    return this.eventForm.controls['minuteEnd']
  }
  get name(){
    return this.eventForm.controls['name']
  }

}
