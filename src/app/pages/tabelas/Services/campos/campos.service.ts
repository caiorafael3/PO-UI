import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../Api/api';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class CamposService {
  constructor(private http: HttpClient, private AutenticacaoService: AutenticacaoService) { }

  public getCampoService(tabela: String): Observable<any> {
    return this.http.post(`${api.urlCampos}`, {consulta: tabela}, {headers: this.AutenticacaoService.getAutenticacao()});
  }

  public getColunasCampoService(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Campo', type: 'string', width: '1px' },
      { property: 'nome', label: 'Nome', type: 'string', width: '1px' },
      { property: 'descricao', label: 'Descrição', type: 'string', width: '1px' },
    ];
  }
}
 