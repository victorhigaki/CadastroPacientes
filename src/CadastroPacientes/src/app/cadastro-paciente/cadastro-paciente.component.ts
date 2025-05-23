import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseButtonComponent } from '../components/base-button/base-button.component';
import { BaseDatepickerComponent } from '../components/base-datepicker/base-datepicker.component';
import { BaseInputComponent } from '../components/base-input/base-input.component';
import { BaseRadioComponent } from '../components/base-radio/base-radio.component';

@Component({
  selector: 'app-cadastro-paciente',
  imports: [
    ReactiveFormsModule,
    BaseInputComponent,
    BaseButtonComponent,
    BaseDatepickerComponent,
    BaseRadioComponent,
  ],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss',
})
export class CadastroPacienteComponent implements OnInit {
  fb = inject(FormBuilder);
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
      convenio: [''],
      numeroCarterinhaConvenio: [''],
      validadeCarteirinha: [''],
    });
  }

  onSubmit() {
    const values = this.cadastroForm.getRawValue();
    console.log(values);
  }
}
