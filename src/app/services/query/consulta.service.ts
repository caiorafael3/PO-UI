import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../Api/api';
import { EditorService } from '../edit/editor.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  constructor(
    private http: HttpClient, 
    private editorService: EditorService,
    private authService: AuthService
  ) {}

  getItemsQuery(codigo: String): Observable<any> {
    this.editorService.setloading(true);

    return this.http.post(`${api.urlConsulta}`, {query: codigo }, {headers: this.authService.getAuthHeaders()});
  }
}
