import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  fb = inject(FormBuilder)
  cadastroForm!: FormGroup;

  generos = [
    {
      key: 1,
      value: 'Masculino'
    },
    {
      key: 2,
      value: 'Feminino'
    },
    {
      key: 3,
      value: 'Outro'
    },
  ]

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: new FormControl<string>(''),
      sobrenome: new FormControl<string>(''),
      dataNascimento: new FormControl<Date | null>(new Date()),
      genero: new FormControl<number | null>(1),
    })
  }

  onSubmit() {
    const values = this.cadastroForm.getRawValue();
    console.log(values);
  }
}
