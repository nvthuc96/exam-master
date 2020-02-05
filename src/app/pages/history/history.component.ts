import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HistoryExam } from '../../Models';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
    histories: HistoryExam[];

    constructor(
        private examService: ExamService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.examService.getAllHistory().subscribe(data => {
            this.histories = data;
            console.log(this.histories);
            this.spinner.hide();
        });
    }
}
