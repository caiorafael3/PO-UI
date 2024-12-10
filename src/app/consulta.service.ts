import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from './Api/api';
import { autenticacao } from './Autenticacao/autenticacao';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private usuario: string = `${autenticacao.usuario}`;
  private senha: string = `${autenticacao.senha}`;

  constructor(private http: HttpClient) { }

  exibirConsulta(codigo: String): Observable<any>{
    const autenticacao = btoa(`${this.usuario}:${this.senha}`)
    const headers = new HttpHeaders({
      Authorization: `Basic ${autenticacao}`
    })
    return this.http.post(`${api.urlConsulta}`, {'query' : codigo}, {headers});
  }
}

