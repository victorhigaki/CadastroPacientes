import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';
import { BaseDatepickerComponent } from '../../components/base-datepicker/base-datepicker.component';
import { BaseInputComponent } from '../../components/base-input/base-input.component';
import { BaseRadioComponent } from '../../components/base-radio/base-radio.component';
import { BaseSelectComponent } from '../../components/base-select/base-select.component';
import { MonthYearDatepickerComponent } from '../../components/month-year-datepicker/month-year-datepicker.component';
import { Keyvalue } from '../../models/keyvalue';
import { ConvenioService } from '../../services/convenio.service';

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
  providers: [ConvenioService],
})
export class CadastroPacienteComponent implements OnInit {
  fb = inject(FormBuilder);
  convenioService = inject(ConvenioService);
  cadastroForm!: FormGroup;

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
      ufRg: [''],
      email: ['', Validators.email],
      celular: [''],
      telefone: [''],
      convenioId: [''],
      numeroCarterinhaConvenio: [''],
      validadeCarteirinha: [''],
    });

    this.convenioService.getAll().pipe(
      map((res) => {
        return res.map((convenio) => {
          return {
            key: convenio.id,
            value: convenio.nome,
          } as Keyvalue;
        });
      })
    ).subscribe({
      next: (res) => {
        this.convenios = res;
      },
    });
  }

  onSubmit() {
    const values = this.cadastroForm.getRawValue();
    values.validadeCarteirinha = values.validadeCarteirinha?.toDate()
    console.log(values);
  }
}
