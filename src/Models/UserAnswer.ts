export class UserAnswer {

    constructor(

        public UserAnswerId: number,
        public UserId: number,
        public ExamId: number,
        public QuestionId: number,
        public SkillId: number,
        public Marks: number,
        public GivenAnswerId: string,
        public AttemptDateTime: Date,
        public RemainingTime: string,
        public ExamGroupId:number,
    ) { }

}