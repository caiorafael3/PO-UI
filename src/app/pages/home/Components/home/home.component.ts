import { Component } from '@angular/core';
import { EditorComponent } from "../editor/editor.component";
import { OpcoesComponent } from '../opcoes/opcoes.component';
import { DadosComponent } from '../dados/dados.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EditorComponent, OpcoesComponent, DadosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
 