import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models';
import { Observable } from 'rxjs';

const API = 'http://highschoolexam.herokuapp.com/api/';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    userRole = [
        { id: 1, role: 'ADMIN' },
        { id: 2, role: 'STUDENT' },
        { id: 3, role: 'TEACHER' },
    ];

    httpHeader = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {}

    getUser(): Observable<User[]> {
        return this.http.get<User[]>(API + 'user/getAll');
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(API + 'user/detail/' + id);
    }

    createUser(user: User) {
        return this.http.post<User>(API + 'user/create', user, this.httpHeader);
    }

    login(user: User): Observable<User> {
        return this.http.post<User>(API + 'user/login', user, this.httpHeader);
    }

    updateUser(id: string, user: User): Observable<User> {
        console.log(JSON.stringify(user));
        return this.http.put<User>(
            API + 'user/update/' + id,
            user,
            this.httpHeader
        );
    }
}
