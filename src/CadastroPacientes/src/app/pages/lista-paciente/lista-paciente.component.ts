import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Paciente } from '../../models/paciente';
import { PacientesService } from '../../services/pacientes.service';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';
import { RouterLink } from '@angular/router';
import { UfService } from '../../services/uf.service';

@Component({
  selector: 'app-lista-paciente',
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatIconModule,
    BaseButtonComponent,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lista-paciente.component.html',
  styleUrl: './lista-paciente.component.scss',
  providers: [PacientesService],
})
export class ListaPacienteComponent {
  pacientesService = inject(PacientesService);

  getPacientes$ = this.pacientesService.getAll();
  pacientes: Paciente[] = [];

  // rows = [
  //   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
  //   { name: 'Dany', gender: 'Male', company: 'KFC' },
  //   { name: 'Molly', gender: 'Female', company: 'Burger King' },
  // ];

  ColumnMode = ColumnMode;

}
