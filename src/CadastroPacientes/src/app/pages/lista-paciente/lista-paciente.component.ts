import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-lista-paciente',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './lista-paciente.component.html',
  styleUrl: './lista-paciente.component.scss',
  providers: [PacientesService],
})
export class ListaPacienteComponent {
  pacientesService = inject(PacientesService);

  getPacientes$ = this.pacientesService.getAll();
}
