import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Notes } from '../../dto/notes.dto';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note?:Notes;
  @Output() openNote = new EventEmitter();
  @Output() deleteNote = new EventEmitter();

  faWindowClose = faWindowClose

  preview:string = "";

  constructor() { }

  ngOnInit(): void {
    if(this.note)this.parseNote()
  }

  private parseNote(){
    const prev = this.note?.text.split("</div>") as string[]
    this.preview = prev.length > 1 ? `${prev[0].substring(0,90)} </div>`: prev[0].substring(0,90)
  }

  opennote(e:any){
    this.openNote.emit(e);
  }

  deletenote(e:any){
    this.deleteNote.emit(e)
  }

}
