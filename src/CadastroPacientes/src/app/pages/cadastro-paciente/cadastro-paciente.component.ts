import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
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
  ],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss',
  providers: [ConveniosService, PacientesService],
})
export class CadastroPacienteComponent implements OnInit {
  cadastroForm!: FormGroup;
  private fb = inject(FormBuilder);
  private convenioService = inject(ConveniosService);
  private pacientesService = inject(PacientesService);
  private toastr = inject(ToastrService);
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
      nome: ['123123', Validators.required],
      sobrenome: ['123123', Validators.required],
      dataNascimento: new FormControl<Date | null>(
        new Date(),
        Validators.required
      ),
      genero: new FormControl<number | null>(1, Validators.required),
      cpf: ['123123'],
      rg: ['123123'],
      UFRG: [''],
      email: ['', Validators.email],
      celular: ['123123'],
      telefoneFixo: ['123123'],
      convenioId: [''],
      numeroCarteirinhaConvenio: ['123123'],
      validadeCarteirinha: [moment()],
    });
  }

  onSubmit() {
    const values = this.cadastroForm.getRawValue() as Paciente;
    this.pacientesService.create(values).subscribe({
      next: () => {
        this.toastr.success('Cadastrado com sucesso!');
      },
      error: (err) => {
        this.toastr.error('Ocorreu um erro ao Cadastrar Paciente');
      },
    });
  }
}
