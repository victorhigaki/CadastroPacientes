import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  convenios: Keyvalue[] = [];
  ufRg: Keyvalue[] = [
    { key: 0, value: 'AC' },
    { key: 1, value: 'AL' },
    { key: 2, value: 'AP' },
    { key: 3, value: 'AM' },
    { key: 4, value: 'BA' },
    { key: 5, value: 'CE' },
    { key: 6, value: 'ES' },
    { key: 7, value: 'GO' },
    { key: 8, value: 'MA' },
    { key: 9, value: 'MT' },
    { key: 10, value: 'MS' },
    { key: 11, value: 'MG' },
    { key: 12, value: 'PA' },
    { key: 13, value: 'PB' },
    { key: 14, value: 'PR' },
    { key: 15, value: 'PE' },
    { key: 16, value: 'PI' },
    { key: 17, value: 'RJ' },
    { key: 18, value: 'RN' },
    { key: 19, value: 'RS' },
    { key: 20, value: 'RO' },
    { key: 21, value: 'RR' },
    { key: 22, value: 'SC' },
    { key: 23, value: 'SP' },
    { key: 24, value: 'SE' },
    { key: 25, value: 'TO' },
    { key: 26, value: 'DF' },
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
      rg: [''],
      ufRg: [0],
      email: ['', Validators.email],
      celular: [''],
      telefoneFixo: [''],
      convenioId: [''],
      numeroCarterinhaConvenio: [''],
      validadeCarteirinha: [moment()],
    });

    this.convenioService
      .getAll()
      .pipe(
        map((res) => {
          return res.map((convenio) => {
            return {
              key: convenio.id,
              value: convenio.nome,
            } as Keyvalue;
          });
        })
      )
      .subscribe({
        next: (res) => {
          this.convenios = res;
        },
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
