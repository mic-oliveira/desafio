import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AgendaService} from '../services/agenda.service';
import {Agenda} from '../model/agenda';
import {Observable, of, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ModalAgendaComponent} from '../modal-agenda/modal-agenda.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export const Paginate = {
  page: 0,
  pageSize: 5
};

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, AfterContentInit {
  length = 0;
  searchString = '';
  agenda: Observable<Agenda[]>;
  page = 0;
  pageSize = 5;
  agendaSubject: Subject<string> = new Subject<string>();
  displayedColumns: string[] = ['id', 'titulo', 'prioridade', 'lembrete', 'acao'];
  data: MatTableDataSource<Agenda> = new MatTableDataSource<Agenda>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: AgendaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.agendaSubject.subscribe(() => {
      this.service.paginate(this.page, this.pageSize).subscribe((agendas: Agenda[]) => {
        this.agenda = of(agendas.filter(agenda => agenda.lembrete.toLowerCase().includes(this.searchString.toLowerCase())));
        this.length = this.service.count();
      });
    });
  }

  ngAfterContentInit(): void {
    this.agendaSubject.next('');
    this.data.paginator = this.paginator;
  }

  search()
  {
    this.agendaSubject.next(this.searchString);
  }

  editar(agenda)
  {
    // @ts-ignore
    this.dialog.open(ModalAgendaComponent, {
      width: '500px',
      data: agenda,
    }).afterClosed().subscribe(data => {
      this.service.update(data);
      this.agendaSubject.next(this.searchString);
    });
  }

  adicionar()
  {
    const modal = this.dialog.open(ModalAgendaComponent, {
      width: '500px',
      data: new Agenda(),
    });
    modal.afterClosed().subscribe(agenda => {
      this.service.post(agenda);
      this.agendaSubject.next(this.searchString);
    });
  }

  mudarPagina(event) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.agendaSubject.next();
  }

}
