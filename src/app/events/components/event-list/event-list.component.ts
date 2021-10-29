import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment-timezone';
import { EventDto } from '../../dto';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

  @Output() o_onChangeMonth = new EventEmitter();
  @Output() o_onClickEvent = new EventEmitter();
  @Input() currentMonth:string;
  @Input() i_events:EventDto[];


  faAngleDown=faAngleDown
  monthSelected = new FormControl('Enero')

  constructor() { }

  ngOnInit(): void {
    if(this.currentMonth) this.monthSelected.setValue(this.currentMonth)
  }

  onChangeMonth(){
    this.o_onChangeMonth.emit(this.monthSelected.value);
  }

  onClickEvent(e:EventDto){
    this.o_onClickEvent.emit(e);
  }

}
