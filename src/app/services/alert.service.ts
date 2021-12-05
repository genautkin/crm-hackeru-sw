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

  done(message:string,milliseconds = 2000) {
    Swal.fire({
      icon: 'success',
      title: message,
      timer: 2000,
      timerProgressBar: true})
  }

  question(title:string,confirmButtonText:string,denyButtonText:string,showCancelButton:boolean) {
    return Swal.fire({
      title: title,
      showDenyButton: true,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      denyButtonText: denyButtonText,
      focusDeny: true
    })
  }
}