export enum QuizOption {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D'
}



export type QuizQuestionAndAnswer = {
    questionId: string
    answer?: QuizOption
}

export interface QuizQueryObject {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export type RawQuestions = QuizQueryObject[]

export type QuizQueryResponse = RawQuestions


