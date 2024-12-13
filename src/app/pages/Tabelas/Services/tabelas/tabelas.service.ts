import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../Api/api';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class tabelaService {
  constructor(private http: HttpClient, private AutenticacaoService: AutenticacaoService) {}

  getTabelas(): Observable<any> {
    return this.http.get(`${api.urlConsulta}`, {headers: this.AutenticacaoService.getAutenticacao()});
  }

  getColunasTabelas(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Tabela', type: 'string', width: '1px' },
      { property: 'nome', label: 'Nome', type: 'string', width: '1px' },
    ];
  }
}