export class User {
    firstName: string;
    lastName:string;
    email: string;
    phone: string;
    address:string;
    notes: string
    constructor(firstName: string, lastName:string, email: string,phone: string, address:string, notes: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.notes = notes;
    }
}