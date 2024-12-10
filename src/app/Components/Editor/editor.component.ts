import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { ConsultaService } from '../../consulta.service';

import {
  PoCheckboxGroupModule,
  PoFieldModule,
  PoButtonModule,
  PoSelectOption,
  PoModule
} from '@po-ui/ng-components';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, PoCodeEditorModule, PoFieldModule, PoCheckboxGroupModule, PoButtonModule, PoModule],
  templateUrl: './editor.component.html',
})

export class EditorComponent {
  public codigo: string = '';
  public tema: string = 'vs';
  public dados: Array<any> = []
  public resultado: Array<{ label: string, property: string;  }> = [];
  public readonly opcoesTema: PoSelectOption[] = [
    { label: 'VS', value: 'vs' },
    { label: 'VS Dark', value: 'vs-dark' },
    { label: 'HC Black', value: 'hc-black' },
  ];

  constructor(private consultaService: ConsultaService){}

  limpar(): void {
    this.codigo = '';
  }

  mudaTema(event: any): void {
    if (event) {
      this.tema = event; 
    } 
  }

  executa(event: string): void {
    if (event) {
      this.consultaService.exibirConsulta(this.codigo).subscribe(resposta => {
        console.log(resposta);
        this.dados = resposta.dados;
        console.log(this.dados);
        
        this.resultado = Object.keys(this.dados[0]).map(key => ({
          label: key,
          property: key
        }));
      }, erro => {
        console.error('Erro ao exibir resultado da consulta', erro);
      });
    }
  }
}
