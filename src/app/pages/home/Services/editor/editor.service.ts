import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class EditorService {
  private consultaSubject = new BehaviorSubject<string>(''); // valor inicial da variavel
  public consulta$ = this.consultaSubject.asObservable(); // Deixa o valor observavel para os outros componentes. Quando tiver alteração, será "notificado" quem for inscrito.

  private temaEditorSubject = new BehaviorSubject<string>('vs');
  public temaEditor$ = this.temaEditorSubject.asObservable();

  private historicoSubject = new BehaviorSubject<Array<any>>([])
  public historico$ = this.historicoSubject.asObservable();

  // Metodo para adicionar novo valor
  public setConsulta(novaConsulta: string): void {
    this.consultaSubject.next(novaConsulta);
  }

  public setTema(novoTema: string): void {
    this.temaEditorSubject.next(novoTema);
  }

  public setHistorico(historico: Array<any>) {
    this.historicoSubject.next(historico)
  }
}
 