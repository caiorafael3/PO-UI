import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { EditorService } from '../../services/edit/editor.service';
import { OptionsComponent } from '../options/options.component';
import { DataComponent } from '../data/data.component';
import {
  PoCheckboxGroupModule,
  PoFieldModule,
  PoButtonModule,
  PoModule
} from '@po-ui/ng-components';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, PoCodeEditorModule, PoCheckboxGroupModule, PoFieldModule, PoButtonModule, PoModule, OptionsComponent, DataComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})

export class EditorComponent {
  public query: string = '';
  public tema: string = '';
  public dados: Array<any> = [];
  public colunas: Array<{ label: string; property: any }> = [];

  constructor(private editorService: EditorService) {
    this.editorService.query$.subscribe((query) => (this.query = query));
    this.editorService.tema$.subscribe((tema) => (this.tema = tema));
    this.editorService.dados$.subscribe((dados) => (this.dados = dados));
    this.editorService.colunas$.subscribe(
      (colunas) => (this.colunas = colunas)
    );
  }

  atualizaQuery(novaQuery: string): void {
    this.editorService.setQuery(novaQuery);
  }
}