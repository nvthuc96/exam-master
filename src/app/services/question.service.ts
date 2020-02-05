import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Class, Category, Question, QuestionList } from '../Models';
import { Observable } from 'rxjs';

const API = 'http://highschoolexam.herokuapp.com/api/';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    httpHeader = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    answer = [
        { id: '1', content: 'A' },
        { id: '2', content: 'B' },
        { id: '3', content: 'C' },
        { id: '4', content: 'D' },
    ];
    questionDifficult = [
        { id: '1', level: 'Dễ' },
        { id: '2', level: 'Trung Bình' },
        { id: '3', level: 'Khó' },
    ];

    constructor(private http: HttpClient) {}

    getCategories() {
        return this.http.get<Category[]>(API + 'category/getAll');
    }

    getClass() {
        return this.http.get<Class[]>(API + 'class/getAll');
    }

    getCategoriesByClassId(id: string) {
        return this.http.get<Category[]>(API + 'class/getCategories/' + id);
    }

    createQuestion(question: Question) {
        return this.http.post<Question>(
            API + 'question/create',
            question,
            this.httpHeader
        );
    }

    getquestionByCategoryId(id: string): Observable<QuestionList[]> {
        return this.http.get<QuestionList[]>(
            API + 'category/getQuestion/' + id
        );
    }
}
