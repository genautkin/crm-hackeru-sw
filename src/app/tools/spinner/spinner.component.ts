import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spiner.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor( private spinnerServ:SpinnerService) { }
  ngOnInit(): void {
    this.spinnerServ.spinnerStatus.subscribe(data =>{
      this.showSpinner = data;
    })
  }
  showSpinner:boolean = true;

  hideSpinner(){
    this.spinnerServ.setStatus(false);
  }

}
