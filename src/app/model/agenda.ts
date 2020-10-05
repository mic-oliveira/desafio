import {Model} from './model';

export class Agenda extends Model{
  private _id: number;
  private _prioridade: number;
  private _titulo: string;
  private _lembrete: string;

  protected fillable = [
    'id',
    'prioridade',
    'titulo',
    'lembrete'
  ];

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get prioridade(): number {
    return this._prioridade;
  }

  set prioridade(value: number) {
    this._prioridade = value;
  }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(value: string) {
    this._titulo = value;
  }

  get lembrete(): string {
    return this._lembrete;
  }

  set lembrete(value: string) {
    this._lembrete = value;
  }

  // Deveria ter sido incluido no modelo abstrato
  toJson() {
    return {
      id: this.id,
      titulo: this.titulo,
      prioridade: this.prioridade.toString(),
      lembrete: this.lembrete
    };
  }
}
