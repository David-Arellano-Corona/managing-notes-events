import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventsService } from './services/events.service';
import { RefreshService } from '../commons/RefreshSession.service';


@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    CalendarComponent,
    CreateEventComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[
    EventsService,
    RefreshService
  ]
})
export class EventsModule { }
