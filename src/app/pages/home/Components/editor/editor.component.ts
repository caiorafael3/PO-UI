import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { EditorService } from '../../Services/editor/editor.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule, PoCodeEditorModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})

export class EditorComponent {
  public consulta: string = '';
  public temaEditor: string = '';

  constructor(private editorService: EditorService) {
    this.editorService.consulta$.subscribe((consulta) => (this.consulta = consulta));
    this.editorService.temaEditor$.subscribe((temaEditor) => (this.temaEditor = temaEditor));
  }

  atualizarConsulta(novaConsulta: string): void {
    this.editorService.setConsulta(novaConsulta);
  }
}