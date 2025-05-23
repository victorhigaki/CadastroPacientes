import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class ConvenioService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Convenio[]>('http://localhost:5142/api/convenios');
  }
}

interface Convenio {
  id: string;
  nome: string;
}