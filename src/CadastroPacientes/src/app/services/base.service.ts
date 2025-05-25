import { HttpHeaders } from '@angular/common/http';

export abstract class BaseService {
  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
