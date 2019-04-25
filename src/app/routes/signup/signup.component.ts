import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login/login.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/shared/services/signup/signup.service';
import { Singupdata } from 'src/app/shared/interfaces/singupdata';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
    'username': ['', Validators.required],
    'password': ['', Validators.required],
    'firstname': ['', Validators.required],
    'lastname': ['', Validators.required],
    'emailAddress': ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private toastService: ToastService, private router: Router,
    private signupService: SignupService) {
  }

  ngOnInit() {
  }

  async signup() {
    if (this.signupForm.valid) {
      this.signupService.signup({
        username: this.signupForm.controls.username.value,
        password: this.signupForm.controls.password.value,
        firstName: this.signupForm.controls.firstName.value,
        lastName: this.signupForm.controls.lastName.value,
        emailAddress: this.signupForm.controls.emailAddress.value
      }).subscribe((response) => {
        if (response !== null && response !== undefined && response !== '') {
          this.toastService.showToasterSuccess(response);
          const msgString = String(response);
          if (!msgString.includes('Unable') && !msgString.includes('error')) {
            this.router.navigate(['/profile']);
          }
          console.log(response);
        }
      }, err => {
        this.toastService.showToasterError('Unable to process now.');
        console.log('Error while reaching REST API.');
      });
    }


  }

}
