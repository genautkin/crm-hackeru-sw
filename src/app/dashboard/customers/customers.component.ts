import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/modules/customer.module';
import { AlertService } from 'src/app/services/alert.service';
import {HelperServiceService} from 'src/app/services/helper-service.service'
import { SpinnerService } from 'src/app/services/spiner.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {


  constructor(private helper:HelperServiceService,
    private alertService: AlertService,private spinnerService: SpinnerService) { }
  @ViewChild('f') signupForm?: NgForm;

  customerId:string = this.helper.createDocId(); 
  
  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    const customerForm = form.form.value;
    customerForm.id = this.customerId;
    customerForm.status = true;
    const customer = this.helper.objToCustomer(form.form.value)
    this.spinnerService.setStatus(true);
    this.helper.saveCustomer(customer.customerToObj()).then(()=>{
      this.alertService.done("Done");
      this.spinnerService.setStatus(false);
    }).catch((err)=>{
      this.spinnerService.setStatus(false);
      this.alertService.error('Error',err.message);
    })
  }

  clearForm(): void {
    this.signupForm?.resetForm();
    this.customerId = this.helper.createDocId();
  }
}
