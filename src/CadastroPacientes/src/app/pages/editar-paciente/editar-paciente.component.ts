import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { map } from 'rxjs';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';
import { BaseRadioComponent } from '../../components/base-radio/base-radio.component';
import { BaseSelectComponent } from '../../components/base-select/base-select.component';
import { Keyvalue } from '../../models/keyvalue';
import { Paciente } from '../../models/paciente';
import { ConveniosService } from '../../services/convenios.service';
import { NotificationService } from '../../services/notification.service';
import { PacientesService } from '../../services/pacientes.service';
import moment from 'moment';
import { MonthYearDatepickerComponent } from '../../components/month-year-datepicker/month-year-datepicker.component';
import { BaseInputComponent } from '../../components/base-input/base-input.component';

@Component({
  selector: 'app-cadastro-paciente',
  imports: [
    RouterLink,
    AsyncPipe,
    MatCardModule,
    MatChipsModule,
    FormsModule,

    ReactiveFormsModule,
    BaseButtonComponent,
    BaseRadioComponent,
    BaseSelectComponent,
    MonthYearDatepickerComponent,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editar-paciente.component.html',
  styleUrl: './editar-paciente.component.scss',
  providers: [ConveniosService, PacientesService, provideNativeDateAdapter()],
})
export class EditarPacienteComponent implements OnInit {
  editarForm!: FormGroup;
  private fb = inject(FormBuilder);
  private convenioService = inject(ConveniosService);
  private pacientesService = inject(PacientesService);
  private notificationService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  pacienteId = this.route.snapshot.paramMap.get('id') || '';
  generos = [
    {
      key: 1,
      value: 'Masculino',
    },
    {
      key: 2,
      value: 'Feminino',
    },
    {
      key: 3,
      value: 'Outro',
    },
  ];
  getAllConvenios$ = this.convenioService.getAll().pipe(
    map((res) => {
      return res.map((convenio) => {
        return {
          key: convenio.id,
          value: convenio.nome,
        } as Keyvalue;
      });
    })
  );
  ufrg: Keyvalue[] = [
    { key: 'AC', value: 'AC' },
    { key: 'AL', value: 'AL' },
    { key: 'AP', value: 'AP' },
    { key: 'AM', value: 'AM' },
    { key: 'BA', value: 'BA' },
    { key: 'CE', value: 'CE' },
    { key: 'ES', value: 'ES' },
    { key: 'GO', value: 'GO' },
    { key: 'MA', value: 'MA' },
    { key: 'MT', value: 'MT' },
    { key: 'MS', value: 'MS' },
    { key: 'MG', value: 'MG' },
    { key: 'PA', value: 'PA' },
    { key: 'PB', value: 'PB' },
    { key: 'PR', value: 'PR' },
    { key: 'PE', value: 'PE' },
    { key: 'PI', value: 'PI' },
    { key: 'RJ', value: 'RJ' },
    { key: 'RN', value: 'RN' },
    { key: 'RS', value: 'RS' },
    { key: 'RO', value: 'RO' },
    { key: 'RR', value: 'RR' },
    { key: 'SC', value: 'SC' },
    { key: 'SP', value: 'SP' },
    { key: 'SE', value: 'SE' },
    { key: 'TO', value: 'TO' },
    { key: 'DF', value: 'DF' },
  ];
  paciente!: Paciente;

  ngOnInit(): void {
    this.editarForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      dataNascimento: new FormControl<Date | null>(
        new Date(),
        Validators.required
      ),
      genero: new FormControl<number | null>(1, Validators.required),
      cpf: [''],
      rg: ['', Validators.required],
      ufrg: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      telefoneFixo: ['', Validators.required],
      convenioId: ['', Validators.required],
      numeroCarteirinhaConvenio: ['', Validators.required],
      validadeCarteirinha: [moment(), Validators.required],
    });

    this.getPaciente();
  }

  private getPaciente() {
    this.pacientesService.getById(this.pacienteId).subscribe({
      next: (res) => {
        this.editarForm.patchValue({ ...res });
      },
    });
  }

  onSubmit() {
    const values = this.editarForm.getRawValue() as Paciente;
    this.pacientesService.update(this.pacienteId, values).subscribe({
      next: () => {
        this.notificationService.success('Paciente Cadastrado com sucesso!');
      },
      error: (err) => {
        this.notificationService.error(
          'Ocorreu um erro ao Cadastrar Paciente!'
        );
      },
    });
  }
}
