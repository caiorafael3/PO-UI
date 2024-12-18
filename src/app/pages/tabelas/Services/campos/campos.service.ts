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
    const tabelaSelecionada = tabela.substring(0,3);
    return this.http.post(`${api.urlCampos}`, {tabela: tabelaSelecionada}, {headers: this.AutenticacaoService.getAutenticacao()});
  }

  public getColunasCampoService(): Array<PoTableColumn> {
    return [
      { property: 'campo', label: 'Campo', type: 'string', width: '30px' },
      { property: 'tipo', label: 'Tipo', type: 'string', width: '5px' },
      { property: 'descricao', label: 'Descrição', type: 'string', width: '100px' },
    ];
  }
}
 