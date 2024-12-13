import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../../../Api/api';
import { DadosService } from '../dados/dados.service';
import { AutenticacaoService } from '../../../../services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  constructor(
    private http: HttpClient, 
    private dadosService: DadosService,
    private autenticacaoService: AutenticacaoService
  ) {}

  getConsulta(codigo: String): Observable<any> {
    this.dadosService.setCarregando(true);

    return this.http.post(`${api.urlConsulta}`, {consulta: codigo }, {headers: this.autenticacaoService.getAutenticacao()});
  }
}
