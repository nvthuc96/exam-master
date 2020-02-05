import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { QuestionDetailComponent } from './pages/question-detail/question-detail.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { ExamDetailComponent } from './pages/exam-detail/exam-detail.component';
import { ExamCreateComponent } from './pages/exam-create/exam-create.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
    // Path '/admin/login' => Trang Login
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },

    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            // Path '/admin' => Trang Dashboard
            { path: '', component: DashboardComponent },

            // Path '/admin/users' => Trang Users
            { path: 'user/getAll', component: UsersComponent },

            // Path '/admin/question' => Trang Questions
            { path: 'category/getQuestion/:id', component: QuestionsComponent },

            // Path '/admin/exams' => Trang Exams
            { path: 'exams/getAllExamByCateId/:id', component: ExamsComponent },

            // Path '/admin/exams/create' => Trang Create Exam
            { path: 'exams/create', component: ExamCreateComponent },

            // Path '/admin/exams/1' => Trang Exams detail
            { path: 'question/getByExam/:id', component: ExamDetailComponent },

            // Path '/admin/question/create' => Trang Create Question
            {
                path: 'question/create',
                component: QuestionDetailComponent,
                data: { action: 'create' },
            },

            // Path '/admin/question/1' => Trang Questions Detail
            {
                path: 'question/update/:id',
                component: QuestionDetailComponent,
                data: { action: 'detail' },
            },

            // Path '/admin/user/create' => Trang create User
            {
                path: 'user/create',
                component: UserDetailComponent,
                data: { action: 'create' },
            },

            // Path '/admin/user/update/:id' => Trang User Detail
            {
                path: 'user/update/:id',
                component: UserDetailComponent,
                data: { action: 'detail' },
            },

            // Path '/admin/history/getAll' => Trang History
            { path: 'history/getAll', component: HistoryComponent },
        ],
    },

    // Còn lại: Trang not found
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
