export class ResultViewModel {

    constructor(
        public UserId: number,
        public ExamId: number,
        public ExamTitle: string,
        public FirstName: string,
        public LastName: string,
        public Email: string,
        public TotalMarks: number,
        public PassMarks: number,
        public NotAttemptedQuestions: number,
        public AttemptedQuestions: number,
        public ObtainMarks: number,
        public Percentage: number,
        public Result: number,
        public TotalQuestions: number
    ) { }

}