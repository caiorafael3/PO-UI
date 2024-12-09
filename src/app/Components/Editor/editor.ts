import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';

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
  templateUrl: './editor.html',
})

export class EditorComponent implements OnInit {
  codigo: string = '';
  tema: string = 'vs';
  
  public readonly OpcoesTema: PoSelectOption[] = [
    { label: 'VS', value: 'vs' },
    { label: 'VS Dark', value: 'vs-dark' },
    { label: 'HC Black', value: 'hc-black' },
  ];

  ngOnInit(): void {
    this.limpar();
  }

  limpar(): void {
    this.codigo = '';
  }

  mudaTema(event: any): void {
    if (event) {
      this.tema = event; 
      console.log('Tema selecionado:', this.tema);
    } 
  }

  verificaUpdate(event: String): void{
    if (event){
      console.log(event);
      if (event.includes("update")){
        alert("Pode update não safado!");
      }
    }
  }
}
