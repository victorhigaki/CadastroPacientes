import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Convenio } from '../models/convenio';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment.development';

@Injectable()
export class ConveniosService extends BaseService {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl ?? 'http://localhost:5000';
  url = `${this.baseUrl}/api/convenios`;

  getAll() {
    return this.http.get<Convenio[]>(this.url, this.ObterHeaderJson());
  }
}
