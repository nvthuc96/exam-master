import { User } from './user.class';
import { QuestionList, Class } from './question.class';

export class Exam {
    id: string;
    cateId: number;
    examName: string;
    mockExam: boolean;
    typeId: number;
}

export class ExamList {
    id: string;
    examName: string;
    createdDate: string;
    userCreated: string;
    active: boolean;
    mock: boolean;
    examTypeDto: number;
    aclass: Class;
    quantity: number;
}

export class ExamType {
    id: string;
    name: string;
    time: number;
}
