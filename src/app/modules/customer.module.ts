export class Customer {
    id: string;
    firstName: string;
    lastName:string;
    email: string;
    phone: string;
    address:string;
    notes: string;
    status: boolean;
    constructor(id: string, firstName: string, lastName:string, email: string,phone: string, address:string, notes: string, status: boolean) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.notes = notes;
        this.status = status;
    }

    customerToObj () {
        return {id:this.id, firstName: this.firstName, lastName: this.lastName, email: this.email, phone:this.phone, address: this.address, notes: this.notes, status:this.status};
    }

    prepareToForm () {
        let obj:any = Object.assign({}, this);
        delete obj['id'];
        delete obj['status'];
        return obj;
    } 
}