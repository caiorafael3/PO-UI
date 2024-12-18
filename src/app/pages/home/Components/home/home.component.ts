import { Component, OnInit } from '@angular/core';
import { EditorComponent } from "../editor/editor.component";
import { OpcoesComponent } from '../opcoes/opcoes.component';
import { DadosComponent } from '../dados/dados.component';
import { tabelaService } from '../../../tabelas/Services/tabelas/tabelas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EditorComponent, OpcoesComponent, DadosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private tabelaService: tabelaService){}

  public ngOnInit(): void {
      this.tabelaService.setTabelaSelecionada('')
  }
}
 