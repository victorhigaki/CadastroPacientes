import { Component, inject, OnInit } from '@angular/core';
import { BaseInputComponent } from '../components/base-input/base-input.component';
import { BaseButtonComponent } from '../components/base-button/base-button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseDatepickerComponent } from '../components/base-datepicker/base-datepicker.component';

@Component({
  selector: 'app-cadastro-paciente',
  imports: [
    ReactiveFormsModule,
    BaseInputComponent, BaseButtonComponent, BaseDatepickerComponent],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss',
})
export class CadastroPacienteComponent implements OnInit {

  fb = inject(FormBuilder)
  cadastroForm!: FormGroup;

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: new FormControl<string>(''),
      sobrenome: new FormControl<string>(''),
      dataNascimento: new FormControl<Date | null>(new Date()),
    })
  }

  onSubmit() {
    const values = this.cadastroForm.getRawValue();
    console.log(values);
  }
}
