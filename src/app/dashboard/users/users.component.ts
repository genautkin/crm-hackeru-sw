import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/modules/user.module';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spiner.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private afs: AngularFirestore,private spinnerService: SpinnerService, private alertService: AlertService,
    private userService:AuthService) { }

  user?:User


  ngOnInit(): void {
  // this.updateDocumentById ('GsjRc0tx8Z3H6s9Rrk1J')
    this.getDocByIdV3("GsjRc0tx8Z3H6s9Rrk1J")
  

  }

  save() {

  }

  getDocById (docID:string) {
       this.afs.doc("users/"+docID).ref.get().then((doc)=>{
      console.log(doc.data())
      this.alertService.done("Done");
      this.spinnerService.setStatus(false);
    }).catch((err)=>{
      this.spinnerService.setStatus(false);
      this.alertService.error('Error',err.message);
    })
  }

  async getDocByIdV2 (docID:string) {
    try {
      var doc = await this.afs.doc("users/"+docID).ref.get();
      console.log(doc.data())
    }
  catch (err:any) {
    this.spinnerService.setStatus(false);
    this.alertService.error('Error',err.message);
  }
}

async getDocByIdV3 (docID:string) {
  try {
    var doc = await this.afs.collection("users").doc(docID).ref.get();
    console.log(doc.data())
  }
catch (err:any) {
  this.spinnerService.setStatus(false);
  this.alertService.error('Error',err.message);
}
}

  setDocumentById () {
    const docID = this.afs.createId();
    console.log(docID)
    var user = {
      firstName: 'Gena',
      lastName: 'Gena2',
      address: 'test',
      createByUserId: this.userService.getUserUid()
    }
       this.afs.collection("users").doc(docID).set(user).then((res)=>{
      console.log(res)
      this.alertService.done("Done");
      this.spinnerService.setStatus(false);
    }).catch((err)=>{
      this.spinnerService.setStatus(false);
      this.alertService.error('Error',err.message);
    })
  }
  
  updateDocumentById (docID:string) {
    var user = {
      temp:'temp'
    }
       this.afs.collection("users").doc(docID).set(user,{ merge: true }).then((res)=>{
      console.log(res)
      this.alertService.done("Done");
      this.spinnerService.setStatus(false);
    }).catch((err)=>{
      this.spinnerService.setStatus(false);
      this.alertService.error('Error',err.message);
    })
  }

  getAllFolder() {
    this.afs.firestore.collection("users").get().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
           this.spinnerService.setStatus(false);
            console.log(doc.id, "=>", doc.data());  
      })
    }).catch ((err) => {
      this.spinnerService.setStatus(false);
      this.alertService.error('Error',err.message);
    })
  }

  setDocumentRandomName () {
    var user = {
      firstName: 'Gena',
      lastName: 'Gena2',
      address: 'test'
    }
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
