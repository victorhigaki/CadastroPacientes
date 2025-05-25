import { Routes } from '@angular/router';
import { ListaPacienteComponent } from './pages/lista-paciente/lista-paciente.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PacienteFormComponent } from './pages/paciente-form/paciente-form.component';

export const routes: Routes = [
  { path: 'cadastro-paciente', component: PacienteFormComponent },
  { path: 'editar-paciente/:id', component: PacienteFormComponent },
  { path: 'lista-paciente', component: ListaPacienteComponent },
  { path: '', redirectTo: 'lista-paciente', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
