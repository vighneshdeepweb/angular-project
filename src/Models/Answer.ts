export class Answer {

    constructor(
        public AnswerId: number,
        public QuestionId: number,
        public AnswerText: string,
        public IsRightAnswer: boolean,
        public IsSelected: boolean
    ) { }

} 