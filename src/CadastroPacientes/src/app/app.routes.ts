import { Routes } from '@angular/router';
import { CadastroPacienteComponent } from './pages/cadastro-paciente/cadastro-paciente.component';
import { EditarPacienteComponent } from './pages/editar-paciente/editar-paciente.component';
import { ListaPacienteComponent } from './pages/lista-paciente/lista-paciente.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'cadastro-paciente', component: CadastroPacienteComponent },
  { path: 'editar-paciente/:id', component: EditarPacienteComponent },
  { path: 'lista-paciente', component: ListaPacienteComponent },
  { path: '', redirectTo: 'lista-paciente', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
