import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login/login.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    'username': ['', Validators.required],
    'password': ['', Validators.required]
  });

  constructor(private loginService: LoginService, private formBuilder: FormBuilder,
    private toastService: ToastService, private router: Router) {
  }

  ngOnInit() {
  }

  async login() {
    console.log('inside login');
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    if (username !== null && username !== undefined && username !== '' && password !== null && password !== undefined && password !== '') {
      this.loginService.login({
        username: username,
        password: password
      }).subscribe((response) => {
        if (response !== null && response !== undefined && response !== '') {
          const msgString = String(response);
          if (!msgString.includes('Unable') && !msgString.includes('error')) {
            this.router.navigate(['/profile']);
          } else {
            this.toastService.showToasterError(String(response));
          }
          console.log(response);
        }
      }, err => {
        this.toastService.showToasterError('Unable to process now.');
        console.log('Error while reaching REST API.');
      });
    } else {
      this.toastService.showToasterInfo('Please provide the input.');
    }
  }

}
