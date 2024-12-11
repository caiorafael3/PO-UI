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

  private dadosSubject = new BehaviorSubject<Array<any>>([])
  public dados$ = this.dadosSubject.asObservable();

  private resultadoSubject = new BehaviorSubject<Array<{ label: string; property: any }>>([]);
  public resultado$ = this.resultadoSubject.asObservable();

  private historicoSubject = new BehaviorSubject<Array<any>>([])
  public historico$ = this.historicoSubject.asObservable();

  // Metodo para adicionar novo valor
  public setquery(novaQuery: string): void {
    this.querySubject.next(novaQuery);
  }

  // Metodo para resgatar o valor
  public getquery(): string {
    return this.querySubject.value;
  }

  public setTema(novoTema: string): void {
    this.temaSubject.next(novoTema);
  }

  public getTema(): string {
    return this.temaSubject.value;
  }

  public setDados(dados: Array<any>): void {
    this.dadosSubject.next(dados);
  }

  public setResultado(resultado: Array<{ label: string; property: any }>): void {
    this.resultadoSubject.next(resultado);
  }

  public getHistorico() : Array<any> {
    return this.historicoSubject.value
  }

  public setHistorico(historico: Array<any>) {
    this.historicoSubject.next(historico)
  }
}
