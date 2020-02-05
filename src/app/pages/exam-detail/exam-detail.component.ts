import { Component, OnInit } from '@angular/core';
import { QuestionList } from '../../Models';
import { ExamService } from '../../services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-exam-detail',
    templateUrl: './exam-detail.component.html',
    styleUrls: ['./exam-detail.component.css'],
})
export class ExamDetailComponent implements OnInit {
    examDetail: QuestionList[];
    size: number;

    constructor(
        private examService: ExamService,
        private activatedRoute: ActivatedRoute,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.getExamDetailById();
    }

    getExamDetailById() {
        this.spinner.show();
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.examService.getExamDetailById(id).subscribe(data => {
            this.examDetail = data;
            this.size = this.examDetail.length;
            if (this.size !== 0) {
                this.examDetail.forEach(element => {
                    this.examService
                        .getAnswerbyQuestionId(element.id)
                        .subscribe(answer => {
                            element.answerList = answer;
                            this.spinner.hide();
                        });
                });
            } else {
                this.spinner.hide();
            }
        });
    }
}
