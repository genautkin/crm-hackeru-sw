import { Injectable } from '@angular/core';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  error(title:string,message: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message
    })
  }
}
