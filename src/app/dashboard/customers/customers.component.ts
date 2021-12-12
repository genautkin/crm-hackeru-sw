import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/modules/customer.module';
import { AlertService } from 'src/app/services/alert.service';
import {HelperServiceService} from 'src/app/services/helper-service.service'
import { SpinnerService } from 'src/app/services/spiner.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit,OnDestroy {
  routeSub: any;


  constructor(private helper:HelperServiceService,
    private route: ActivatedRoute,
    private alertService: AlertService,private spinnerService: SpinnerService) { }
  @ViewChild('f') signupForm?: NgForm;
  customerId:string = this.helper.createDocId(); 
  title:string = 'Add new customer';
  customer?:Customer;
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']){
        this.getCustomerById(params['id']);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getCustomerById(id:string) {
    this.spinnerService.setStatus(true);
    this.helper.getCustomerById(id).then((data) => {
      this.spinnerService.setStatus(false);
      data.forEach((doc) => {
        this.customer = this.helper.objToCustomer(doc.data());
        console.log(this.customer.prepareToForm ())
        this.signupForm?.setValue(this.customer.prepareToForm ());
        if (doc.exists){
          this.customerId = id;
          this.title = "Edit customer"
        }

   })
    })
    
    
    
    
    // .onSnapshot((querySnapshot) => {
    //   this.spinnerService.setStatus(false);
    //   this.customersFromDb = [];
    //   querySnapshot.forEach((doc) => {
    //        this.customersFromDb.push(this.helper.objToCustomer(doc.data()))
    //   })
    //   this.customers = [...this.customersFromDb];
    // })
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
