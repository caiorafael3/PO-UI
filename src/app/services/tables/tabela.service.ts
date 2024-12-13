import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { api } from '../../Api/api';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class tabelaService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getItemsTables(): Observable<any> {
    return this.http.get(`${api.urlConsulta}`, {headers: this.authService.getAuthHeaders()});
  }
}