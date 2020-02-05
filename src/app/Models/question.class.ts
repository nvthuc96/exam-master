import { Category } from './category.class';

export class Question {
    id: string;
    answerDescription: string;
    answerFirst: string;
    answerSecond: string;
    answerThird: string;
    answerFour: string;
    categoryId: number;
    correctPoint: number;
    diffId: number;
    questionContent: string;
}

export class QuestionList {
    id: string;
    content: string;
    active: boolean;
    category: Category;
    levelDto: Class;
    diff: string;
    answerList: AnswerList[];
    correctAnswer: Answer;
    description: string;
}

export class Difficult {
    id: string;
    level: string;
}

export class Class {
    id: string;
    classname: string;
}

export class Answer {
    id: string;
    content: string;
}

export class AnswerList {
    id: string;
    content: string;
    correct?: boolean;
    description: string;
}
