import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/shared/services/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
    'password': ['', Validators.required],
    'firstName': ['', Validators.required],
    'lastName': ['', Validators.required],
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
        password: this.signupForm.controls.password.value,
        firstName: this.signupForm.controls.firstName.value,
        lastName: this.signupForm.controls.lastName.value,
        emailAddress: this.signupForm.controls.emailAddress.value
      }).subscribe((response) => {
        if (response !== null && response !== undefined && response !== '') {
          const msg = String(response);
          const msgString = String(response);
          if (!msgString.includes('Unable') && !msgString.includes('error')) {
            this.toastService.showToasterSuccess('Sign Up Successfull.');
            this.router.navigate(['/success']);
          } else {
            this.toastService.showToasterError(msgString);
            this.router.navigate(['/success']);
          }
          console.log(response);
        }
      }, err => {
        this.toastService.showToasterError('Unable to process now.');
        console.log('Error while reaching REST API.');
      });
    } else {
      this.toastService.showToasterInfo('Please complete the form.');
    }


  }

}
