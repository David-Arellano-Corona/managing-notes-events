import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NotesComponent } from './notes.component';
import { NoteComponent } from './components/note/note.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { NotesServices } from './services/notes.services';
import { RefreshService } from '../commons/RefreshSession.service';

@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule, 
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule
  ],
  providers:[
    NotesServices,
    RefreshService
  ]
})
export class NotesModule { }
