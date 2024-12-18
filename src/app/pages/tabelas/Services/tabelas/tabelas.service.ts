import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { api } from '../../../../Api/api';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class tabelaService {
  private nomeTabelaSelecionadaSubject = new BehaviorSubject<string>('')
  public nomeTabelaSelecionada$ = this.nomeTabelaSelecionadaSubject.asObservable();

  constructor(private http: HttpClient, private AutenticacaoService: AutenticacaoService) {}

  public getTabelaService(busca : string): Observable<any> {
    return this.http.post(`${api.urlTabelas}`, {busca : busca } , {headers: this.AutenticacaoService.getAutenticacao()});
  }

  public getColunasTabelaService(): Array<PoTableColumn> {
    return [
      { property: 'tabela', label: 'Tabela', type: 'string', width: '1px' },
      { property: 'nome', label: 'Nome', type: 'string', width: '100px' },
    ];
  }

  public setTabelaSelecionada(nomeTabela : string) : void{
    this.nomeTabelaSelecionadaSubject.next(nomeTabela);
  }
} 