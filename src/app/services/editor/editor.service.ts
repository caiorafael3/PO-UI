import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Decorador que marca uma classe como disponível para ser fornecida e injetada como uma dependência
@Injectable({
  providedIn: 'root', 
})
export class EditorService {
  private querySubject = new BehaviorSubject<string>(''); // valor inicial da variavel
  // Deixa o valor observavel para os outros componentes. Quando tiver alteração, será "notificado" quem for inscrito.
  public query$ = this.querySubject.asObservable(); 

  private temaSubject = new BehaviorSubject<string>('vs');
  public tema$ = this.temaSubject.asObservable();

  private carregandoSubject = new BehaviorSubject<boolean>(false);
  public carregando$ = this.carregandoSubject.asObservable();

  private dadosSubject = new BehaviorSubject<Array<any>>([])
  public dados$ = this.dadosSubject.asObservable();

  private colunasSubject = new BehaviorSubject<Array<{ label: string; property: any }>>([]);
  public colunas$ = this.colunasSubject.asObservable();

  private historicoSubject = new BehaviorSubject<Array<any>>([])
  public historico$ = this.historicoSubject.asObservable();

  // Metodo para adicionar novo valor
  setQuery(novaQuery: string): void {
    this.querySubject.next(novaQuery);
  }

  // Metodo para resgatar o valor
  getQuery(): string {
    return this.querySubject.value;
  }

  setTema(novoTema: string): void {
    this.temaSubject.next(novoTema);
  }

  getTema(): string {
    return this.temaSubject.value;
  }

  setCarregando(carregando: boolean): void {
    this.carregandoSubject.next(carregando);
  }

  setDados(dados: Array<any>): void {
    this.dadosSubject.next(dados);
  }

  setColunas(colunas: Array<{ label: string; property: any }>): void {
    this.colunasSubject.next(colunas);
  }

  getHistorico() : Array<any> {
    return this.historicoSubject.value
  }

  setHistorico(historico: Array<any>) {
    this.historicoSubject.next(historico)
  }
}
