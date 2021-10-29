import { Component, OnInit } from '@angular/core';
import { EventsService } from './services/events.service';
import { serialize } from '../commons/serializer';
import { EventDetailDto, EventDto, EventsResponseDto } from './dto';
import { EventDetailSerializer } from './serializers';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


  showCalendar = true;
  year?: number;
  month?: number;
  day?: number;
  labelMonth?: string;
  eventDetail?: EventDetailDto;

  events: EventDto[] = [
    { id: 1, description: 'Pruebas', name: 'Nuevo evento', starttime: '2021-10-26T15:20:00.000Z', endtime: '2021-10-26T20:20:00.000Z' },
    { id: 2, description: 'Pruebas 2', name: 'Nuevo evento', starttime: '2021-10-26T15:20:00.000Z', endtime: '2021-10-26T20:20:00.000Z' }
  ];

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.listEvents()
  }

  private listEvents() {
    this.eventsService.listEvents().subscribe(e => {
      let res = e as EventsResponseDto;
      this.events = res.items;
    })
  }

  private toggleCalendar() {
    this.showCalendar = !this.showCalendar
    this.cleanData()
  }
  private cleanData() {
    const isToShowCalendar = this.showCalendar == true;
    if (isToShowCalendar) {
      this.eventDetail = undefined;
    }
  }

  onChangeMonth(month: string) {
    console.log(month)
  }

  onClickDay(date: any) {
    this.toggleCalendar()
    console.log(date)
    this.year = date.year;
    this.month = date.month;
    this.day = date.day;
    this.labelMonth = date.labelMonth;
  }

  back() {
    this.toggleCalendar()
  }

  createEvents(event: EventDto) {
    console.log(event)
    const isToUpdateEvent = event?.id;
    if (isToUpdateEvent) {
      this.updateEvent(event);
    } else {
      this.eventsService.createEvent(event).subscribe(e => {
        const res = e as EventsResponseDto;
        const event = res.items[0]
        this.events.push(event)
      })

    }

    this.toggleCalendar()
  }

  onClickEvent(e: EventDto) {
    console.log(e)
    this.eventDetail = serialize<EventDetailDto>(e, EventDetailSerializer);
    this.toggleCalendar();
  }

  private updateEvent(event: EventDto) {
    const index = this.events.findIndex(e => e.id == event.id)
    const existEvent = index != -1;
    if (existEvent) {
      this.eventsService.updateEvent(event).subscribe(e => {
        console.log(e)
        let res = e as EventsResponseDto;
        const newEvent = res.items[0]
        const events: EventDto[] = Object.assign([], this.events);
        events[index] = newEvent;
        this.events = events;
      })
    }
  }

}
