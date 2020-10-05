import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Agenda} from '../model/agenda';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  get(): Observable<any>
  {
    return this.http.get('./assets/resources/agenda-resource.json').pipe(map(agenda => {
      if (localStorage.getItem('agendas') === null) {
        localStorage.setItem('agendas', JSON.stringify(agenda));
      }
    }));
  }

  paginate(page: number, pageSize: number): Observable<Agenda[]>
  {
    return this.get().pipe(map(agenda => {
      const agendas = JSON.parse(localStorage.getItem('agendas')) as Agenda[];
      const pageStart = page * pageSize;
      const pageEnd =  ((page + 1) * pageSize);
      return (agendas.slice(pageStart, (pageEnd > agendas.length) ? agendas.length : pageEnd)) as Agenda[];
    }));
  }

  post(agenda: Agenda)
  {
    const agendas = JSON.parse(localStorage.getItem('agendas'));
    agenda.id = agendas.length + 1;
    agendas.push(agenda.toJson());
    localStorage.setItem('agendas', JSON.stringify(agendas));
  }

  remove(agenda: Agenda)
  {
    const agendas = JSON.parse(localStorage.getItem('agendas')) as Agenda[];
    const index = agendas.findIndex(x => x.id === agenda.id);
    localStorage.setItem('agendas', JSON.stringify(agendas.filter(ag => ag.id !== agenda.id)));
  }

  update(agenda: Agenda)
  {
    const agendas = JSON.parse(localStorage.getItem('agendas')) as Agenda[];
    const index = agendas.findIndex(x => x.id === agenda.id).toString();
    agendas[index] = agenda.toJson();
    localStorage.setItem('agendas', JSON.stringify(agendas));
  }

  count(): number
  {
    return (JSON.parse(localStorage.getItem('agendas')) as Agenda[]).length;
  }
}
