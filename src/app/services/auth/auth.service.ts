import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { authentication } from '../../Authentication/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: string = `${authentication.usuario}`;
  private senha: string = `${authentication.senha}`;
  private authentication: string = btoa(`${this.usuario}:${this.senha}`); // Transforma a string em uma representação codificada em Base64(sequência de caracteres)

  // Metodo para gerar o header de authentication
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Basic ${this.authentication}`
    });
  }
}