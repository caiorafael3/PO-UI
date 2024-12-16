import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorService } from '../../Services/editor/editor.service';
import { DadosService } from '../../Services/dados/dados.service';
import { ConsultaService } from '../../Services/consulta/consulta.service';
import { HistoricoComponent } from './historico/historico.component';
import { temaConfig } from '../../../../config/tema.config';

import {
  PoModule,
  PoModalModule,
  PoModalComponent,
  PoNotificationService,
  PoThemeService
} from '@po-ui/ng-components';

@Component({
  selector: 'app-opcoes',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule, PoModalModule, HistoricoComponent],
  templateUrl: './opcoes.component.html',
  styleUrl: './opcoes.component.css',
})

export class OpcoesComponent implements OnInit { 
  public opcaoTema: boolean = false;
  public consulta: string = '';
  public titulo: string = '';
  public historico: Array<any> = []
  
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  constructor(
    private editorService: EditorService, 
    private consultaService: ConsultaService, 
    private dadosService : DadosService, 
    private poNotification : PoNotificationService,
    private poThemeService : PoThemeService
  ) {
    // Se inscreve para observar mudanças dos valores no código e tema
    this.editorService.consulta$.subscribe((consulta) => (this.consulta = consulta));
  }

  public ngOnInit() {
    const temaSalvo = localStorage.getItem('tema');
    this.opcaoTema = temaSalvo === 'dark'

    this.aplicarTema();
  }

  // Metodo para alterar o tema
  public mudarTema() : void{
    this.aplicarTema()
  }

  // Metodo para aplicar o tema selecionado
  private aplicarTema() {
    this.poThemeService.setTheme(temaConfig, this.opcaoTema ? 1 : 0);
    this.editorService.setTema(this.opcaoTema ? 'vs-dark' : 'vs');
    localStorage.setItem('tema', this.opcaoTema ? 'dark' : 'light'); 
  }

  // Metodo para limpar o editor
  public limpar(): void {
    this.editorService.setConsulta(''); 
  }

  // Metodo para executar o consulta SQL do editor
  public executar(): void {
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
        error: (error) => {
          this.poNotification['error'](`Ocorreu um erro ao exibir resultado da consulta.`);
          console.error(`Ocorreu um erro ao exibir resultado da consulta: ${error}`);
        }
      })
    }
  }

  // Metodo para fechar o modal de salvar
  public closeModal() {
    this.poModal.close();
  }

  // Metodo para salvar o conteudo da consulta
  public salvar(): void {
    const mensagemAlerta = this.validarDados();

    if (mensagemAlerta) {
      this.poNotification['information'](mensagemAlerta);
      return;
    }

    this.salvarArquivo(this.consulta, this.titulo);
    this.poModal.close();
    this.poNotification['success']('Arquivo salvo com sucesso.');
  }

  // Metodo para verificar se todas informação necessárias estão preenchidas
  private validarDados(): string | null{
    if (!this.consulta && !this.titulo) {
      return 'Titulo e consulta não informado.';
    }
    if (!this.consulta) {
      return 'Consulta não informada.';
    }
    if (!this.titulo) {
      return 'Titulo não informado.';
    }
    return null;
  }

  // Metodo para realizar o download do arquivo
  private salvarArquivo(consulta: string, titulo: string): void {
    const arquivo = new Blob([consulta], { type: "text/plain" });
    const elementoLink = document.createElement("a");
    const url = URL.createObjectURL(arquivo);
  
    elementoLink.href = url;
    elementoLink.download = `${titulo}.sql`;
    elementoLink.click();
    URL.revokeObjectURL(url);
  }

  // Metodo para verificar o arquivo selecionado
  public selecionarArquivo(event : Event) : void {
    const elemento = event.target as HTMLInputElement
    if (elemento.files){
      const arquivo = elemento.files[0];
      this.lerArquivo(arquivo);
    }
  }

  // Metodo para ler arquivo selecionado
  private lerArquivo(arquivo : File): void {
    const leitor = new FileReader();
    try {
      leitor.readAsText(arquivo); // Lendo todo o conteudo do arquivo
      // Ao carregar, irá enviar o conteudo lido para o editor
      leitor.onload = (event: any) => {
        this.editorService.setConsulta(event.target.result)
      };
    } catch (error) {
      this.poNotification['error'](`Ocorreu um erro ao ler o arquivo.`);
      console.error(`Ocorreu um erro ao exibir resultado da consulta: ${error}`);
    }
  }
}