import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';

@Injectable()
export class PacientesService {
  http = inject(HttpClient);
  url = 'http://localhost:5142/api/pacientes';

  getAll() {
    return this.http.get<Paciente[]>(this.url);
  }

  getById(pacienteId: string) {
    return this.http.get<Paciente>(`${this.url}/${pacienteId}`);
  }

  create(paciente: Paciente) {
    return this.http.post(this.url, paciente);
  }

  update(id: string, paciente: Paciente) {
    return this.http.put(`${this.url}/${id}`, paciente);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
