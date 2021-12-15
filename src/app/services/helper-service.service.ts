import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Customer } from '../modules/customer.module';
import { User } from '../modules/user.module';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  constructor(private afs: AngularFirestore) { }

  public objToCustomer(obj:any) {
    return new Customer(obj.id ,obj.firstName, obj.lastName, obj.email, obj.phone, obj.address, obj.notes, obj.status)
}

saveCustomer(customerObj:any) {
  return this.afs.collection("customers").doc(customerObj.id).set(customerObj,{merge: true});
}

saveUser(uid:string,user:User) {
  const _user:any = user.userToObj();
  _user['uid'] = uid;
  return this.afs.collection("users").doc(uid).set(_user,{merge: true});
}

createDocId() {
  return this.afs.createId();
}

getAllCustomers(status:boolean) {
    return this.afs.firestore.collection("customers").where("status","==",status)

}

getCustomerById(id:string) {
  return this.afs.firestore.collection("customers").where("id","==",id).get()
}

removeCustomer(id:string) {
  return this.afs.collection("customers").doc(id).delete()
}

changeStatusCustomer(id:string,status:boolean) {
  return this.afs.collection("customers").doc(id).set({status: status},{merge: true})
}

searchInCustomersArray(customersArray:Customer[],searchValue:string) {

          var searchValue =  searchValue.toLowerCase();
          // var searchFunction = function (customer: Customer) {
          //     return customer.address.toLowerCase().includes(searchValue) ||
          //           customer.phone.toLowerCase().includes(searchValue) || 
          //           customer.email.toLowerCase().includes(searchValue) || 
          //           customer.notes.toLowerCase().includes(searchValue) ||
          //           customer.firstName.toLowerCase().includes(searchValue) ||
          //           customer.lastName.toLowerCase().includes(searchValue)
          // }

          return customersArray.filter((customer: Customer) => {
            return customer.address.toLowerCase().includes(searchValue) ||
                  customer.phone.toLowerCase().includes(searchValue) || 
                  customer.email.toLowerCase().includes(searchValue) || 
                  customer.notes.toLowerCase().includes(searchValue) ||
                  customer.firstName.toLowerCase().includes(searchValue) ||
                  customer.lastName.toLowerCase().includes(searchValue)
        });

}  

}
