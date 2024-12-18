import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private carregandoSubject = new BehaviorSubject<boolean>(false); // valor inicial da variavel
  public carregando$ = this.carregandoSubject.asObservable(); // Deixa o valor observavel para os outros componentes. Quando tiver alteração, será "notificado" quem for inscrito.

  private retornouErroSubject = new BehaviorSubject<string>('');
  public retornouErro$ = this.retornouErroSubject.asObservable(); 

  private dadosSubject = new BehaviorSubject<Array<any>>([]);
  public dados$ = this.dadosSubject.asObservable();

  private colunasSubject = new BehaviorSubject<Array<{ label: string; property: any }>>([]);
  public colunas$ = this.colunasSubject.asObservable();

  // Metodo para adicionar novo valor
  public setCarregando(carregando: boolean): void {
    this.carregandoSubject.next(carregando);
  }

  public setRetornouErro(retornouErro: string): void {
    this.retornouErroSubject.next(retornouErro);
  }

  public setDados(dados: Array<any>): void {
    this.dadosSubject.next(dados);
  }

  public setColunas(colunas: Array<{ label: string; property: any }>): void {
    this.colunasSubject.next(colunas);
  }
}
 