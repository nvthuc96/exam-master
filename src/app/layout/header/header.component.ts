import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    userId = '';
    userWelcome = 'user';

    constructor() {}

    ngOnInit() {
        this.userWelcome = localStorage.getItem('userName');
        this.userId = localStorage.getItem('userId');
    }

    logout() {
        localStorage.removeItem('passWord');
        localStorage.removeItem('userName');
    }
}
