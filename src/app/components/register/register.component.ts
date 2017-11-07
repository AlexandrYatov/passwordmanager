import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  nForm: FormGroup;
  post: any;
  password: string= '';
  name: string= '';
  titleAlert:string = 'This field is required'

  constructor(private fb: FormBuilder) {
    this.nForm = fb.group({
      'name': [null, Validators.required],
      'password': [null, Validators.compose([ Validators.required, Validators.minLength(8), Validators.maxLength(16)])]
    });
  }

  addUser(user){
    this.name = user.name;
    this.password = user.password;
  }


}
