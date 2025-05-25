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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import moment from 'moment';
import { NgxMaskDirective } from 'ngx-mask';
import { map } from 'rxjs';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';
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
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.scss',
  providers: [ConveniosService, PacientesService, provideNativeDateAdapter()],
  standalone: true,
})
export class PacienteFormComponent implements OnInit {
  pacienteForm!: FormGroup;
  private fb = inject(FormBuilder);
  private convenioService = inject(ConveniosService);
  private pacientesService = inject(PacientesService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
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
  dataMaximaHoje = new Date();

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
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

    this.validarSomenteTelefoneOuCelular();

    if (this.pacienteId) this.getPaciente();
  }

  private validarSomenteTelefoneOuCelular() {
    this.pacienteForm.valueChanges.subscribe((value) => {
      if (value.telefoneFixo && value.celular) {
        this.pacienteForm
          .get('telefoneFixo')
          ?.addValidators(Validators.required);
        this.pacienteForm.get('celular')?.addValidators(Validators.required);
      }
      if (value.telefoneFixo && !value.celular) {
        this.pacienteForm
          .get('telefoneFixo')
          ?.addValidators(Validators.required);
        this.pacienteForm.get('celular')?.clearValidators();
      }
      if (value.celular && !value.telefoneFixo) {
        this.pacienteForm.get('celular')?.addValidators(Validators.required);
        this.pacienteForm.get('telefoneFixo')?.clearValidators();
      }
      this.pacienteForm.get('celular')?.updateValueAndValidity();
      this.pacienteForm.get('telefoneFixo')?.updateValueAndValidity();
    });
  }

  private getPaciente() {
    this.pacientesService.getById(this.pacienteId).subscribe({
      next: (res) => {
        this.pacienteForm.patchValue({ ...res });
      },
    });
  }

  onSubmit() {
    if (!this.pacienteForm.valid) {
      this.validar();
      return;
    }
    this.pacienteId ? this.editar() : this.criar();
  }

  private criar() {
    const paciente = Object.assign({}, this.pacienteForm.getRawValue());
    if (paciente.hasOwnProperty('id')) delete paciente.id;
    this.pacientesService.create(paciente).subscribe({
      next: () => {
        this.notificationService.success('Paciente Cadastrado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err.error);
        this.notificationService.error(
          err.error ?? 'Ocorreu um erro ao Cadastrar Paciente!'
        );
      },
    });
  }

  private editar() {
    const paciente = Object.assign({}, this.pacienteForm.getRawValue());
    this.pacientesService.update(this.pacienteId, paciente).subscribe({
      next: () => {
        this.notificationService.success('Paciente Editado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.notificationService.error(
          err.error ?? 'Ocorreu um erro ao Cadastrar Paciente!'
        );
      },
    });
  }

  validar() {
    const errors = [];
    if (this.pacienteForm.get('nome')?.hasError('required')) {
      errors.push('Nome');
    }
    if (this.pacienteForm.get('sobrenome')?.hasError('required')) {
      errors.push('Sobrenome');
    }
    if (this.pacienteForm.get('dataNascimento')?.hasError('required')) {
      errors.push('DataNascimento');
    }
    if (this.pacienteForm.get('genero')?.hasError('required')) {
      errors.push('Genero');
    }
    if (this.pacienteForm.get('rg')?.hasError('required')) {
      errors.push('RG');
    }
    if (this.pacienteForm.get('ufrg')?.hasError('required')) {
      errors.push('UF do RG');
    }
    if (this.pacienteForm.get('email')?.hasError('required')) {
      errors.push('Email');
    }
    if (this.pacienteForm.get('celular')?.hasError('required')) {
      errors.push('Celular');
    }
    if (this.pacienteForm.get('telefoneFixo')?.hasError('required')) {
      errors.push('Telefone Fixo');
    }
    if (this.pacienteForm.get('convenioId')?.hasError('required')) {
      errors.push('Convênio');
    }
    if (
      this.pacienteForm.get('numeroCarteirinhaConvenio')?.hasError('required')
    )
      errors.push('Carteirinha do Convenio');
    {
    }
    if (this.pacienteForm.get('validadeCarteirinha')?.hasError('required')) {
      errors.push('Validade Carteirinha');
    }

    this.notificationService.alert('Completar os campos: ' + errors.join(', '));
  }
}
