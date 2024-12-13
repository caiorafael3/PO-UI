import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorService } from '../../services/edit/editor.service';
import { ConsultaService } from '../../services/query/consulta.service';
import { HistoryComponent } from './history/history.component';

import {
  PoModule,
  PoSelectOption,
  PoModalModule,
  PoModalComponent 
} from '@po-ui/ng-components';

@Component({
  selector: 'app-opcoes',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule, PoModalModule, HistoryComponent],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css',
})

export class OptionsComponent {
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
    this.editorService.setQuery(''); 
  }

  // Metodo para alterar o tema do editor
  mudaTema(novoTema: string): void {
    this.editorService.setTema(novoTema); 
  }
  
  // Metodo para executar o query SQL do editor
  executa(): void {
    if (this.query) {
      this.historico.push({ "consulta" : this.query});
      this.consultaService.getItemsQuery(this.query).subscribe({
        next: (resposta) => {
          console.log(resposta);
          const dados = resposta.dados;
          const colunas = Object.keys(dados[0]).map((key) => ({
            label: key,
            property: key
          }))
          this.editorService.setDados(dados);
          this.editorService.setColunas(colunas);
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
  selecionaArquivo(event : Event) : void {
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
      this.editorService.setQuery(event.target.result)
    };
    
    leitor.onerror = (err) => {
      console.error('Erro ao ler o arquivo', err);
    };
  }
}