import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  toastrService = inject(ToastrService);

  success(message: string) {
    this.toastrService.success(message ?? 'Relizada com sucesso!', 'Sucesso!');
  }

  alert(message: string) {
    this.toastrService.warning(message ?? 'Verifique novamente!', 'Atenção!');
  }

  error(message: string) {
    this.toastrService.error(message ?? 'Ocorreu um erro!', 'Opa!');
  }
}
