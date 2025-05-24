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

  create(paciente: Paciente) {
    return this.http.post(this.url, paciente);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
