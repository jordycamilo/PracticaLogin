import { Component,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { signal } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
fb=inject(FormBuilder);
hasError= signal (false);

loginForm=this.fb.group({
  email:['',Validators.required,Validators.email],
  password:['',Validators.required,Validators.minLength(6)],
})

onSubmit(){
  if(this.loginForm.invalid){
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
    return;
  }
  const {email ="",password=""}=this.loginForm.value;
  console.log({email,password});
}

}
