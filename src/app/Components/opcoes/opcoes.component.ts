import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorService } from '../../services/editor/editor.service';
import { ConsultaService } from '../../services/consulta/consulta.service';
import { HistoricoComponent } from './historico/historico.component';

import {
  PoModule,
  PoSelectOption,
  PoModalModule,
  PoModalComponent 
} from '@po-ui/ng-components';

@Component({
  selector: 'app-opcoes',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule, PoModalModule, HistoricoComponent],
  templateUrl: './opcoes.component.html',
  styleUrl: './opcoes.component.css',
})

export class OpcoesComponent {
  public tema: string = 'vs';
  public query: string = '';
  public titulo: string = '';
  public historico: Array<any> = []
  public readonly opcoesTema: PoSelectOption[] = [
    { label: 'VS', value: 'vs' },
    { label: 'VS Dark', value: 'vs-dark' },
    { label: 'HC Black', value: 'hc-black' },
  ];
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  constructor(private editorService: EditorService, private consultaService: ConsultaService) {
    // Se inscreve para observar mudanças dos valores no código e tema
    this.editorService.query$.subscribe((query) => (this.query = query));
    this.editorService.tema$.subscribe((tema) => (this.tema = tema));
  }

  // Metodo para limpar o editor
  limpar(): void {
    this.editorService.setquery(''); 
  }

  // Metodo para alterar o tema do editor
  mudaTema(novoTema: string): void {
    this.editorService.setTema(novoTema); 
  }
  
  // Metodo para executar o query SQL do editor
  executa(): void {
    if (this.query) {
      this.historico.push({ "consulta" : this.query})
      this.consultaService.executarConsulta(this.query).subscribe({
        next: (resposta) => {
          console.log(resposta);
          const dados = resposta.dados 
          const colunas = Object.keys(dados[0]).map((key) => ({
            label: key,
            property: key
          }))
          this.editorService.setDados(dados);
          this.editorService.setColunas(colunas);
          this.editorService.setHistorico(this.historico)
        },
        error: (erro) => {
          console.error('Erro ao exibir colunas da consulta', erro);
        }
      })
    }
  }

  // Metodo para fechar o modal de salvar
  closeModal() {
    this.poModal.close();
  }

  // Metodo para criar e salvar arquivo
  salvar(): void {
  }
}