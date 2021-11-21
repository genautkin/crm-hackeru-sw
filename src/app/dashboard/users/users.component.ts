import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spiner.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private afs: AngularFirestore,private spinnerService: SpinnerService, private alertService: AlertService) { }

  ngOnInit(): void {
    var user = {
      firstName: 'Gena',
      lastName: 'Gena2',
      address: 'test'
    }
    this.spinnerService.setStatus(true);
    this.afs.collection("users").doc().set(user).then((res)=>{
      console.log(res)
      this.alertService.done("Done");
      this.spinnerService.setStatus(false);
    }).catch((err)=>{
      this.spinnerService.setStatus(false);
      this.alertService.error('Error',err.message);
    })
  }

}
