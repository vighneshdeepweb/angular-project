export class AnswerViewModel {

    constructor(
        public AnswerId: number,
        public QuestionId: number,
        public AnswerText: string,
        public IsRightAnswer: boolean,
        public IsAttempted: boolean,// Used In case of attempt exam
        public IsSelected: boolean 
    ) { }

}