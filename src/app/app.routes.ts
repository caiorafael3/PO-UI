import { Routes } from '@angular/router';
import { TabelaComponent } from './pages/Tabelas/Components/tabelas/tabelas.component';
import { HomeComponent } from './pages/home/Components/home/home.component';

export const routes: Routes = [
    {path: 'home', title: 'home', component: HomeComponent},
    {path: 'tabelas', title: 'tabelas', component: TabelaComponent}
];
