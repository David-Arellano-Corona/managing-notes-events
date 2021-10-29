import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Notes } from '../../dto/notes.dto';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, OnChanges {

  @Output() createNote = new EventEmitter();
  @Input() text?:Notes;

  faSave = faSave

  form = new FormControl("")

  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '350px',
    minHeight: '350px',
    maxHeight: '350px',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Escribe tu nota aqui...',
    toolbarPosition: "top",
    translate: 'no',
    toolbarHiddenButtons: [
      ["strikeThrough", 'undo', 'redo', 'subscript', 'superscript', 'insertVideo', 'link', 'unlink'],
      ['html', 'insertHorizontalRule', 'removeFormat', 'textColor', 'backgroundColor','toggleEditorMode']
    ],
    outline:false
  };

  constructor(
  ) { }

  ngOnInit(): void {
    this.setText()
  }

  ngOnChanges(){
    if(this.text) this.setText()
  }

  setText(){
    this.form.setValue(this.text?.text)
  }

  saveNote(){
    const note = this.form.value;
    this.createNote.emit(note);
  }


}
