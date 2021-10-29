import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { NgForm, NgModel } from '@angular/forms';
import { handleError } from '../commons/handleError';
import { NotesServices } from './services/notes.services';
import { NotesListDto } from './dto/notes-list.dto';
import { Notes } from './dto/notes.dto';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  showWorkspace = false
  notes: Notes[] = [];
  selectedNote?: Notes;

  search:string = "";

  constructor(
    private notesService: NotesServices
  ) { }

  ngOnInit(): void {
    this.getNotes("")
  }

  private getNotes(filter:string) {
    this.notesService.listNotes(filter)
      .pipe(catchError(handleError))
      .subscribe(
        (res) => {
          const response = res as NotesListDto
          this.notes = response.items;
        },
        this.handleError,
      )
  }

  searchNote(){
    this.getNotes(this.search)
  }

  handleWorkspace(canShow: boolean) {
    this.showWorkspace = canShow
  }

  newNote(){
    this.selectedNote = { text:"" } as Notes;
    this.handleWorkspace(true)
  }

  private handleError(err: any) {
    console.log(err)
  }
  private handleResponse = (res: any) => {
    this.handleWorkspace(false)
    // actualizar el arreglo de notas con una miniatura de la nueva nota
    this.notes.push(res.items[0])
    //toDo: Pensar que se mostrará en la miniatura
  }

  private createNote(value: string) {
    this.notesService.createNote(value)
      .pipe(catchError(handleError))
      .subscribe(
        this.handleResponse,
        this.handleError
      )
  }

  private updateNote(value: string) {
    this.notesService.updateNote(this.selectedNote as Notes, value)
      .pipe(catchError(handleError))
      .subscribe(
        (e) => {
          this.handleWorkspace(false)
          this.selectedNote = undefined;
          this.getNotes("")
        },
        this.handleError
      )
  }

  saveNote(value: any) {
    const willItUpdate = this.selectedNote?.id
    if (!willItUpdate) {
      this.createNote(value)
    } else {
      this.updateNote(value);
    }

  }

  openNote(e: any) {
    this.selectedNote = e;
    this.handleWorkspace(true)
  }

  deleteNote(e:any){
    this.notesService.deleteNote(e)
    .pipe(catchError(handleError))
    .subscribe(
      (e)=>{
        this.getNotes("")
      },
      this.handleError
    )
  }
}
