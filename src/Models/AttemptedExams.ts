export class AttemptedExams {
    constructor(
        public AttemptedExamId: number,
        public ExamId: number,
        public UserId: number,
        public TotalQuestions:number,
        public NotAttemptedQuestions:number,
        public AttemptedQuestions:number,
        public MarksObtained: number,
        public Percentage: number,
        public Result: boolean,
        public ExamDate: Date,
        public ExamStatusId: number,
    ) { }
}