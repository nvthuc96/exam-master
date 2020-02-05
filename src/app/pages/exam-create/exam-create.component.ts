import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Class, Category, Exam } from '../../Models';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exam-create',
    templateUrl: './exam-create.component.html',
    styleUrls: ['./exam-create.component.css'],
})
export class ExamCreateComponent implements OnInit {
    classList: Class[];
    categories: Category[];
    exam: Exam;
    examType = [
        { id: 1, type: 'Kiểm tra 15 phút' },
        { id: 2, type: 'Kiểm tra 90 phút' },
        { id: 3, type: 'Kiểm tra 120 phút' },
    ];

    examForm = this.fb.group({
        cateId: '',
        examName: ['', Validators.required],
        mockExam: 'true',
        typeId: '1',
    });

    constructor(
        private questionService: QuestionService,
        private examService: ExamService,
        private spinner: NgxSpinnerService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.questionService.getClass().subscribe(data => {
            this.classList = data;
            this.getCategoryByClassId(this.classList[0].id);
        });
    }

    getCategoryByClassId(id: string) {
        this.spinner.show();
        this.questionService.getCategoriesByClassId(id).subscribe(data => {
            this.categories = data;
            this.examForm.get('cateId').setValue(this.categories[0].id);
            this.spinner.hide();
        });
    }

    createExam() {
        if (this.examForm.invalid) {
            this.examForm.get('examName').markAsTouched();
        } else {
            this.spinner.show();
            this.exam = this.examForm.value;
            this.examService.createExam(this.exam).subscribe(data => {
                if (confirm('Do you want create exam continue?')) {
                    this.resetExamForm();
                } else {
                    this.router.navigate(['/admin/exams/getAllExamByCateId/1']);
                }
                this.spinner.hide();
            });
        }
    }
    resetExamForm() {
        this.examForm.get('examName').reset();
    }
}
