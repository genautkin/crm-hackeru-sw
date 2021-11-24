import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor() { }
  @ViewChild('f') signupForm?: NgForm;
  
  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    console.log(form);
    form.form.invalid
  }
}
