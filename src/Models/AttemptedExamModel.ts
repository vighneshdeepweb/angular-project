export class AttemptedExamViewModel {

    constructor(
        public ExamId: number,
        public ExamName: string,
        public TotalMarks: number,
        public TotalUsers: number,
        public AttemptedUsers: number,
        public CreatedDate: Date 
    ) { }

}