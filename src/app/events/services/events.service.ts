import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { concat } from 'rxjs';
import { SessionService } from '../../commons/session.service';
import { RefreshService } from '../../commons/RefreshSession.service';
import { DOMAIN } from '../../config';
import { EventDto, EventsResponseDto } from '../dto'

@Injectable()
export class EventsService{
    private URL = `${DOMAIN}/events`
    constructor(
        private httpService:HttpClient,
        private sessionService:SessionService,
        private refreshService:RefreshService
    ){
    }

    listEvents(){
        return concat(
            this.refreshService.checkTokenExpiration(),
            this.httpService.get<EventsResponseDto>(this.URL,{
                responseType:'json',
                headers:{
                    'Authorization':`Bearer ${this.sessionService.getsession()}`
                }
            })
        )
    }

    createEvent(event:EventDto){
        const owner = this.sessionService.getsessionInfo().user_id;
        return concat(
            this.refreshService.checkTokenExpiration(),
            this.httpService.post(this.URL, {...event, owner},{
                responseType:'json',
                headers:{
                    'Authorization':`Bearer ${this.sessionService.getsession()}`
                }
            })
        )
    }

    updateEvent(event:EventDto){
        const eventId = event.id;
        return concat(
            this.refreshService.checkTokenExpiration(),
            this.httpService.patch(`${this.URL}/${eventId}`,event,{
                responseType:'json',
                headers:{
                    'Authorization':`Bearer ${this.sessionService.getsession()}`
                }
            })
        )
    }
}