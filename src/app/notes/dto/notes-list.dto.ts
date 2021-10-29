import { Items, Notes } from './notes.dto';

export interface NotesListDto{
    count:number;
    next:string;
    previous:string;
    items: Notes[];
}