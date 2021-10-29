import { Notes } from './notes.dto';

interface NoteUpdate extends Pick<Notes,"id"|"text">{}

export interface NotesUpdate{
    items:NoteUpdate[]
}