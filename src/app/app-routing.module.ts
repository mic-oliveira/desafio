import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgendaComponent} from './agenda/agenda.component';


const routes: Routes = [
  {path: '', redirectTo: 'agenda', pathMatch: 'full'},
  {path: 'agenda', component: AgendaComponent},
  {path: '**', component: AgendaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
