import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, Observable } from 'rxjs';
import { DOMAIN } from '../../config';
import { SessionService } from '../../commons/session.service';
import { RefreshService } from '../../commons/RefreshSession.service';
import { NotesCreateDto } from '../dto/notes-create.dto';
import { NotesListDto } from '../dto/notes-list.dto';
import { Notes } from '../dto/notes.dto';
import { NotesUpdate } from '../dto/notes-update.dto';
import { not } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class NotesServices {
    URL = `${DOMAIN}/notes`

    constructor(
        private httpService: HttpClient,
        private sessionService: SessionService,
        private refreshService: RefreshService
    ) {
    }


    createNote(text: string) {
        return concat(
            this.refreshService.checkTokenExpiration(),
            this.httpService.post<NotesCreateDto>(this.URL, { text }, {
                responseType: 'json',
                headers: {
                    'Authorization': `Bearer ${this.sessionService.getsession()}`
                }
            })
        )
    }

    updateNote(note:Notes, text:string){
        return concat(
            this.refreshService.checkTokenExpiration(),
            this.httpService.patch<NotesUpdate>(`${this.URL}/${note.id}/text`,{ text },{
                responseType:'json',
                headers:{
                    Authorization:`Bearer ${this.sessionService.getsession()}`
                }
            })
        ) 
    }

    deleteNote(note:Notes){
        return concat(
            this.refreshService.checkTokenExpiration(),
            this.httpService.patch(`${this.URL}/${note.id}/store`,{isStore:true},{
                responseType:'json',
                headers:{
                    Authorization:`Bearer ${this.sessionService.getsession()}`
                }
            })
        )
    }

    listNotes(filter:string){
        return concat(
            this.refreshService.checkTokenExpiration(),
            this.httpService.get<NotesListDto>(this.URL,{
                params:{
                    text:filter
                },
                responseType:'json',
                headers:{
                    'Authorization':`Bearer ${this.sessionService.getsession()}`
                }
            })
        )
    }
}