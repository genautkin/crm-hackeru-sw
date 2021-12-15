import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Customer } from 'src/app/modules/customer.module';
import { AlertService } from 'src/app/services/alert.service';
import { HelperServiceService } from 'src/app/services/helper-service.service';
import { SpinnerService } from 'src/app/services/spiner.service';

@Component({
  selector: 'app-show-customers',
  templateUrl: './show-customers.component.html',
  styleUrls: ['./show-customers.component.css']
})
export class ShowCustomersComponent implements OnInit,OnDestroy {

  constructor(private helper:HelperServiceService, private spinnerService: SpinnerService, private alertService: AlertService,private deviceService: DeviceDetectorService) { }
  //TODO change it to css
  isMobile = this.deviceService.isMobile();

  customers: Customer[] = [];
  customersFromDb: Customer[] = [];
  snapshot:any = null;
  ngOnInit(): void {
     this. getAllCustomers(true);
  }

  getAllCustomers(status:boolean) {
    this.spinnerService.setStatus(true);
    this.snapshot = this.helper.getAllCustomers(status).onSnapshot((querySnapshot) => {
      this.spinnerService.setStatus(false);
      this.customersFromDb = [];
      querySnapshot.forEach((doc) => {
           this.customersFromDb.push(this.helper.objToCustomer(doc.data()))
      })
      this.customers = [...this.customersFromDb];
    })
  }

  onChangeStatus(status: string) {
    this.stopSnapshot()
    if (status === 'true') {
      this.getAllCustomers(true);
    }
    else {
      this.getAllCustomers(false);
    }
  
  }

  stopSnapshot() {
    if (this.snapshot) {
      this.snapshot()
    }
  }

  ngOnDestroy(): void {
    this.stopSnapshot()
  }

  exampleFun(val: string) {
    return val + ' !'
  }

  
  searchChange(event: any) {
    this.customers =  this.helper.searchInCustomersArray(this.customersFromDb,event.target.value);
  }
  // remove(id: string) {
  //   this.alertService.question("Are you sure you want to remove?",'Yes','No',false).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       this.spinnerService.setStatus(true);
  //       this.helper.removeCustomer(id).then(() => {
  //         this.spinnerService.setStatus(false);
  //         this.alertService.done("Done");
  //         this. getAllCustomers();
  //       }).catch ((err) => {
  //         this.spinnerService.setStatus(false);
  //         this.alertService.error('Error',err.message);
  //       })
  //     } 
  //   });
  // }

  changeStatus(id: string,status:boolean) {
    if (status === false) {
      this.alertService.question("Are you sure you want to remove?",'Yes','No',false).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.spinnerService.setStatus(true);
          this.helper.changeStatusCustomer(id,status)
        } 
      });
    }
    else {
      this.helper.changeStatusCustomer(id,status)
    }
  
  }

}
