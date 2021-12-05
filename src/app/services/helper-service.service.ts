import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Customer } from '../modules/customer.module';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  constructor(private afs: AngularFirestore) { }

  public objToCustomer(obj:any) {
    return new Customer(obj.id ,obj.firstName, obj.lastName, obj.email, obj.phone, obj.address, obj.notes)
}

saveCustomer(customerObj:any) {
  return this.afs.collection("customers").doc(customerObj.id).set(customerObj,{merge: true});
}

createDocId() {
  return this.afs.createId();
}

getAllCustomers() {
    return this.afs.firestore.collection("customers").get()

}

removeCustomer(id:string) {
  return this.afs.collection("customers").doc(id).delete()
}
  
}
