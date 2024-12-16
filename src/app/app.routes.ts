import { Routes } from '@angular/router';
import { TabelaComponent } from './pages/tabelas/Components/tabelas/tabelas.component';
import { HomeComponent } from './pages/home/Components/home/home.component';
import { MinhasConsultasComponent } from './pages/minhasConsultas/Components/minhas-consultas/minhas-consultas.component';

export const routes: Routes = [
    {path: 'home', title: 'home', component: HomeComponent},
    {path: 'minhasConsultas', title: 'minhasConsultas', component: MinhasConsultasComponent},
    {path: 'tabelas', title: 'tabelas', component: TabelaComponent}
];
