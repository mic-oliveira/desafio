import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Agenda} from '../model/agenda';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})
export class ModalAgendaComponent implements OnInit {
  selected = '1';
  agenda: Agenda = new Agenda();
  constructor(public dialogRef: MatDialogRef<ModalAgendaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.agenda.fill(this.data);
    console.log(this.agenda);
    this.selected = this.agenda.prioridade ? this.agenda.prioridade.toString() : '1';
  }

  close()
  {
    this.dialogRef.close(this.agenda);
  }

  setPriority(value)
  {
    console.log(this.selected);
    this.agenda.prioridade = value;
  }

  salvar(agenda: Agenda)
  {
    console.log(agenda.toArray());
     // this.data = this.agenda;
  }

}
