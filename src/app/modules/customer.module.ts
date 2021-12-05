export class Customer {
    id: string;
    firstName: string;
    lastName:string;
    email: string;
    phone: string;
    address:string;
    notes: string
    constructor(id: string, firstName: string, lastName:string, email: string,phone: string, address:string, notes: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.notes = notes;
    }

    customerToObj () {
        return {id:this.id, firstName: this.firstName, lastName: this.lastName, email: this.email, phone:this.phone, address: this.address, notes: this.notes}
    }
}