import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/modules/customer.module';
import { AlertService } from 'src/app/services/alert.service';
import { HelperServiceService } from 'src/app/services/helper-service.service';
import { SpinnerService } from 'src/app/services/spiner.service';

@Component({
  selector: 'app-show-customers',
  templateUrl: './show-customers.component.html',
  styleUrls: ['./show-customers.component.css']
})
export class ShowCustomersComponent implements OnInit {

  constructor(private helper:HelperServiceService, private spinnerService: SpinnerService, private alertService: AlertService) { }
  customers: Customer[] = [];
  ngOnInit(): void {
     this. getAllCustomers()
  }

  getAllCustomers() {
    this.customers = [];
    this.spinnerService.setStatus(true);
    this.helper.getAllCustomers().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
           this.spinnerService.setStatus(false);
           this.customers.push(this.helper.objToCustomer(doc.data()))
      })
    }).catch ((err) => {
      this.spinnerService.setStatus(false);
      this.alertService.error('Error',err.message);
    })
  }
  
  remove(id: string) {
    this.alertService.question("Are you sure you want to remove?",'Yes','No',false).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.spinnerService.setStatus(true);
        this.helper.removeCustomer(id).then(() => {
          this.spinnerService.setStatus(false);
          this.alertService.done("Done");
          this. getAllCustomers();
        }).catch ((err) => {
          this.spinnerService.setStatus(false);
          this.alertService.error('Error',err.message);
        })
      } 
    });
  }

}
