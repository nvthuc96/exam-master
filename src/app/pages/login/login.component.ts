import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../Models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public check = false;
    user: User;

    loginForm = this.fb.group({
        userName: ['', Validators.required],
        passWorld: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {}

    login() {
        this.checkLogin();
        if (!this.check) {
            this.spinner.show();
            this.user = this.loginForm.value;
            this.userService.login(this.user).subscribe(data => {
                if (data !== null) {
                    console.log(data);
                    localStorage.setItem('userId', data.id);
                    localStorage.setItem('userName', data.userName);
                    localStorage.setItem('role', data.role.toString());
                    this.router.navigate(['/admin']);
                    this.spinner.hide();
                } else {
                    this.check = true;
                    this.spinner.hide();
                }
            });
        } else {
            this.check = true;
            this.spinner.hide();
        }
    }

    checkLogin() {
        this.check =
            this.loginForm.get('userName').invalid ||
            this.loginForm.get('passWorld').invalid;
    }
}
