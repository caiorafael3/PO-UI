import { Component, EventEmitter, Output } from '@angular/core';
import { PoThemeService } from '@po-ui/ng-components';
import { temaConfig } from '../config/tema.config';
import { EditorService } from '../pages/home/Services/editor/editor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tema',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css'
})
export class TemaComponent {
  @Output() temaAlterado = new EventEmitter<boolean>();
  public opcaoTema: boolean = false;

  constructor(private poThemeService: PoThemeService, private editorService: EditorService) {}

  public ngOnInit() {
    const temaSalvo = localStorage.getItem('tema');
    this.opcaoTema = temaSalvo === 'dark';
    this.aplicarTema();
  }

  // Método para alterar o tema
  public mudarTema() : void {
    this.aplicarTema();
    this.temaAlterado.emit(this.opcaoTema);  // Emite a alteração do tema para o AppComponent
  }

  // Método para aplicar o tema selecionado
  private aplicarTema() {
    this.poThemeService.setTheme(temaConfig, this.opcaoTema ? 1 : 0);
    this.editorService.setTema(this.opcaoTema ? 'vs-dark' : 'vs');
    localStorage.setItem('tema', this.opcaoTema ? 'dark' : 'light'); 
  }
}
