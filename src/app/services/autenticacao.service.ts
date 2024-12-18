import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { autenticacao } from '../autenticacao/autenticacao';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private usuario: string = `${autenticacao.usuario}`;
  private senha: string = `${autenticacao.senha}`;
  private autenticacao: string = btoa(`${this.usuario}:${this.senha}`); // Transforma a string em uma representação codificada em Base64(sequência de caracteres)

  // Metodo para gerar o header de autenticacao
  public getAutenticacao(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Basic ${this.autenticacao}`
    });
  }
} 