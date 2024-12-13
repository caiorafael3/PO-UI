import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorService } from '../../Services/editor/editor.service';
import { DadosService } from '../../Services/dados/dados.service';
import { ConsultaService } from '../../Services/consulta/consulta.service';
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
  public consulta: string = '';
  public titulo: string = '';
  public historico: Array<any> = []
  public readonly opcoesTema: PoSelectOption[] = [
    { label: 'VS', value: 'vs' },
    { label: 'VS Dark', value: 'vs-dark' },
    { label: 'HC Black', value: 'hc-black' },
  ];
  
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  constructor(private editorService: EditorService, private consultaService: ConsultaService, private dadosService : DadosService) {
    // Se inscreve para observar mudanças dos valores no código e tema
    this.editorService.consulta$.subscribe((consulta) => (this.consulta = consulta));
    this.editorService.temaEditor$.subscribe((temaEditor) => (this.tema = temaEditor));
  }

  // Metodo para limpar o editor
  limpar(): void {
    this.editorService.setConsulta(''); 
  }

  // Metodo para alterar o tema do editor
  mudarTema(novoTema: string): void {
    this.editorService.setTema(novoTema); 
  }
  
  // Metodo para executar o consulta SQL do editor
  executar(): void {
    if (this.consulta) {
      this.historico.push({ "consulta" : this.consulta});
      this.consultaService.getConsulta(this.consulta).subscribe({
        next: (resposta) => {
          console.log(resposta);
          const dados = resposta.dados;
          const colunas = Object.keys(dados[0]).map((key) => ({
            label: key,
            property: key
          }))
          this.dadosService.setDados(dados);
          this.dadosService.setColunas(colunas);
          this.editorService.setHistorico(this.historico);
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

  // Metodo para verificar o arquivo selecionado
  selecionarArquivo(event : Event) : void {
    const elemento = event.target as HTMLInputElement
    if (elemento.files){
      const arquivo = elemento.files[0];
      this.lerArquivo(arquivo);
    }
  }

  // Metodo para ler arquivo selecionado
  lerArquivo(arquivo : File): void {
    const leitor = new FileReader();
    leitor.readAsText(arquivo);
    
    leitor.onload = (event: any) => {
      this.editorService.setConsulta(event.target.result)
    };
    
    leitor.onerror = (err) => {
      console.error('Erro ao ler o arquivo', err);
    };
  }
}