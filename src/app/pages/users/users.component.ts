import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Models';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
    selectedRole = 0;
    searchByName = '';
    newEn = '';
    users: User[];
    userRole = this.userService.userRole;

    constructor(
        private userService: UserService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.userService.getUser().subscribe(data => {
            this.users = data;
            this.spinner.hide();
        });
    }

    deleteUserById() {
        if (confirm('Do you want to delete User?')) {
            this.router.navigate(['/admin/user/getAll']);
        }
    }

    refresh() {
        this.searchByName = '';
        this.selectedRole = 0;
    }

    getRole(newValue: string) {
        console.log(newValue.substring(newValue.lastIndexOf(':') + 2));
    }
}
