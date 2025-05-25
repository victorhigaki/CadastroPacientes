import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskPipe } from 'ngx-mask';
import { tap } from 'rxjs';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';
import { NotificationService } from '../../services/notification.service';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-lista-paciente',
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatIconModule,
    BaseButtonComponent,
    RouterLink,
    NgxMaskPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lista-paciente.component.html',
  styleUrl: './lista-paciente.component.scss',
  providers: [PacientesService],
})
export class ListaPacienteComponent {
  private pacientesService = inject(PacientesService);
  private notificationService = inject(NotificationService);

  ColumnMode = ColumnMode;

  public getPacientes$ = this.pacientesService.getAll().pipe(
    tap({
      next: () =>
        this.notificationService.success('Pacientes carregado com sucesso!'),
      error: () =>
        this.notificationService.error(
          'Ocorreu um erro ao carregar Pacientes!'
        ),
    })
  );

  onClickDelete(id: string) {
    this.pacientesService.delete(id).subscribe({
      next: () => {
        this.notificationService.success('Paciente Excluído com sucesso!');
        // todo: colocar exclusão pelo front
        this.getPacientes$.subscribe();
      },
      error: () => {
        this.notificationService.success('Ocorreu um erro Excluir Paciente!');
      },
    });
  }
}
