import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../Api/api';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CampoService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getItemsFields(tabela: String): Observable<any> {
    return this.http.post(`${api.urlConsulta}`, {query: tabela}, {headers: this.authService.getAuthHeaders()});
  }
}
