import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import moment from 'moment';
import { map } from 'rxjs';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';
import { BaseDatepickerComponent } from '../../components/base-datepicker/base-datepicker.component';
import { BaseInputComponent } from '../../components/base-input/base-input.component';
import { BaseRadioComponent } from '../../components/base-radio/base-radio.component';
import { BaseSelectComponent } from '../../components/base-select/base-select.component';
import { MonthYearDatepickerComponent } from '../../components/month-year-datepicker/month-year-datepicker.component';
import { Keyvalue } from '../../models/keyvalue';
import { Paciente } from '../../models/paciente';
import { ConveniosService } from '../../services/convenios.service';
import { NotificationService } from '../../services/notification.service';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-cadastro-paciente',
  imports: [
    ReactiveFormsModule,
    BaseInputComponent,
    BaseButtonComponent,
    BaseDatepickerComponent,
    BaseRadioComponent,
    BaseSelectComponent,
    MonthYearDatepickerComponent,
    RouterLink,
    AsyncPipe,
    MatCardModule,
    MatChipsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss',
  providers: [ConveniosService, PacientesService],
})
export class CadastroPacienteComponent implements OnInit {
  cadastroForm!: FormGroup;
  private fb = inject(FormBuilder);
  private convenioService = inject(ConveniosService);
  private pacientesService = inject(PacientesService);
  private notificationService = inject(NotificationService);
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
  ufRg: Keyvalue[] = [
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

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      dataNascimento: new FormControl<Date | null>(
        new Date(),
        Validators.required
      ),
      genero: new FormControl<number | null>(1, Validators.required),
      cpf: [''],
      rg: ['', Validators.required],
      UFRG: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      telefoneFixo: ['', Validators.required],
      convenioId: ['', Validators.required],
      numeroCarteirinhaConvenio: ['', Validators.required],
      validadeCarteirinha: [moment(), Validators.required],
    });
  }

  onSubmit() {
    if (!this.cadastroForm.valid) return;
    const values = this.cadastroForm.getRawValue() as Paciente;
    this.pacientesService.create(values).subscribe({
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
