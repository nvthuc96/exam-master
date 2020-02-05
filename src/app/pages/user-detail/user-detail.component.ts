import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../Models';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
    typeForm = '';
    public phoneNumberPattern = '(09|01[2|6|8|9|3])+([0-9]{8})\\b';
    public phoneError = '';
    public emailError = '';
    user: User;

    userRole = this.userService.userRole;

    userForm = this.fb.group({
        fullName: ['', Validators.required],
        userName: [
            '',
            [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(12),
            ],
        ],
        passWorld: [
            '',
            [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(12),
            ],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        role: '1',
        active: 'true',
    });

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private activedRoutte: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.activedRoutte.data.subscribe(data => {
            this.typeForm = data.action;
            if (this.typeForm === 'detail') {
                this.getUserById();
            }
        });
    }

    createUser() {
        if (this.userForm.invalid) {
            this.userForm.get('fullName').markAsTouched();
            this.userForm.get('userName').markAsTouched();
            this.userForm.get('passWorld').markAsTouched();
            this.userForm.get('email').markAsTouched();
            this.userForm.get('phone').markAsTouched();
        } else {
            this.spinner.show();
            this.user = this.userForm.value;
            this.userService.createUser(this.user).subscribe(data => {
                this.router.navigate(['/admin/user/getAll']);
                this.spinner.hide();
            });
        }
    }

    getUserById() {
        const id = this.activedRoutte.snapshot.paramMap.get('id');
        this.spinner.show();
        this.userService.getUserById(id).subscribe(data => {
            data.role = this.passRole(data.role.toString());
            this.userForm.patchValue(data);
            this.spinner.hide();
        });
    }

    updateUser() {
        if (this.userForm.dirty) {
            const id = this.activedRoutte.snapshot.paramMap.get('id');
            this.user = this.userForm.value;
            // this.user.passWorld = localStorage.getItem('passWord');
            // this.user.userName = localStorage.getItem('userName');
            console.log('update: ', this.user);
            this.spinner.show();
            this.userService.updateUser(id, this.user).subscribe(data => {
                console.log('updated: ', data);
                alert('Update ifnormation successfull!');
                this.router.navigate(['/admin/user/getAll']);
                this.spinner.hide();
            });
        } else {
            alert('The information is not modified');
            this.router.navigate(['/admin/user/getAll']);
        }
    }

    passRole(role: string) {
        if (role === 'ADMIN') {
            return 1;
        } else if (role === 'STUDENT') {
            return 2;
        } else {
            return 3;
        }
    }

    validatePhone() {
        if (this.userForm.get('phone').value === '') {
            this.phoneError = 'Phone is required';
        } else if (this.userForm.get('phone').invalid) {
            this.phoneError =
                'Phone is invalid. Ex: 0987123232, length: 10 digits';
        }
        return (
            this.userForm.get('phone').invalid &&
            (this.userForm.get('phone').touched ||
                this.userForm.get('phone').dirty)
        );
    }

    validateEmail() {
        if (this.userForm.get('email').value === '') {
            this.emailError = 'Email is required';
        } else if (this.userForm.get('email').invalid) {
            this.emailError = 'Email is invalid. Ex: abc@gmai.com';
        }
        return (
            this.userForm.get('email').invalid &&
            (this.userForm.get('email').touched ||
                this.userForm.get('email').dirty)
        );
    }
}
