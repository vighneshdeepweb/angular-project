export class AttemptQuestion {
    constructor(
        public QuestionId: number,
         
        public AnswerId: string,
        public CheckedAnswer: boolean
    ) { }
}