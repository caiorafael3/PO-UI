import { Routes } from '@angular/router';
import { TabelaComponent } from './Components/tabela/tabela.component';
import { EditorComponent } from './Components/Editor/editor.component';

export const routes: Routes = [
    {path: 'home', title: 'home', component: EditorComponent},
    {path: 'tabelas', title: 'tabelas', component: TabelaComponent}
];
