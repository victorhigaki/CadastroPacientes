import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Convenio } from '../models/convenio';

@Injectable()
export class ConveniosService {
  http = inject(HttpClient);
  url = 'http://localhost:5142/api/convenios';

  getAll() {
    return this.http.get<Convenio[]>(this.url);
  }
}
