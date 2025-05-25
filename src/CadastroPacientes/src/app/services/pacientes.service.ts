import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment.development';

@Injectable()
export class PacientesService extends BaseService {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl ?? 'http://localhost:5000';
  url = `${this.baseUrl}/api/pacientes`;

  getAll() {
    return this.http.get<Paciente[]>(this.url, this.ObterHeaderJson());
  }

  getById(pacienteId: string) {
    return this.http.get<Paciente>(
      `${this.url}/${pacienteId}`,
      this.ObterHeaderJson()
    );
  }

  create(paciente: Paciente) {
    return this.http.post(this.url, paciente, this.ObterHeaderJson());
  }

  update(id: string, paciente: Paciente) {
    return this.http.put(`${this.url}/${id}`, paciente, this.ObterHeaderJson());
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`, this.ObterHeaderJson());
  }
}
