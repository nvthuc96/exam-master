import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Class, Category, Difficult, ExamList } from '../../Models';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExamService } from '../../services/exam.service';

@Component({
    selector: 'app-exams',
    templateUrl: './exams.component.html',
    styleUrls: ['./exams.component.css'],
})
export class ExamsComponent implements OnInit {
    public selectedCategory = '1';
    public selectedDifficult = '0';
    public selectedClass = '0';
    public searchByExam = '';
    classList: Class[];
    categories: Category[];
    difficultList: Difficult[];
    examList: ExamList[];

    constructor(
        private questionService: QuestionService,
        private examService: ExamService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.questionService.getClass().subscribe(data => {
            this.classList = data;
        });
        this.questionService.getCategories().subscribe(data => {
            this.categories = data;
        });
        this.difficultList = this.questionService.questionDifficult;
        this.getExamByCategoryId();
    }

    deleteExamById() {
        if (confirm('Do you want to delete Exam?')) {
            this.router.navigate(['/admin/exams']);
        }
    }

    getExamByCategoryId() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.examService.getAllExamByCategoryId(id).subscribe(data => {
            this.examList = data;
            this.spinner.hide();
        });
    }

    onchangeCategory(id: string) {
        this.spinner.show();
        this.router.navigate(['/admin/exams/getAllExamByCateId/' + id]);
        this.examService.getAllExamByCategoryId(id).subscribe(data => {
            this.examList = data;
            this.spinner.hide();
        });
    }

    refresh() {
        this.searchByExam = '';
        this.selectedCategory = '1';
        this.selectedDifficult = '0';
        this.selectedClass = '0';
    }
}
