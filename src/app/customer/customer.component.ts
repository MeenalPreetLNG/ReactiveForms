import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { FormGroup ,FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
//  customer = new Customer();

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email :['',[Validators.required,Validators.email]],
      phone:'',
      notification :'email',
      rating :null,
      sendCatalog:true
    });
    
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm?.value));
  }

  populateTestData() :void{
    this.customerForm.patchValue({
      firstName :'mahima',
      lastName :'mr',
      // email :'mahima.mr@gmail.com',
      sendCatalog:true
    });
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }

}
