import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoginGuard } from './commons/is-login.guard'
import { HasSessionGuard } from './commons/has-session.guard';

const routes: Routes = [
  { 
    path:'signup', 
    loadChildren: ()=>import('./signup/signup.module').then( e=> e.SignupModule), 
    canActivate:[IsLoginGuard] },
  { 
    path:'signin', 
    loadChildren: () => import('./signin/signin.module').then( e => e.SigninModule ), 
    canActivate:[IsLoginGuard] },
  { 
    path:'notes', 
    loadChildren: () => import('./notes/notes.module').then( e=> e.NotesModule),
    canActivate:[HasSessionGuard] 
  },
  {
    path:'events',
    loadChildren: () => import('./events/events.module').then(e=> e.EventsModule),
    canActivate:[HasSessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
