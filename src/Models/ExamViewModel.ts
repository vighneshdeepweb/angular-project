export class ExamViewModel {
    constructor(

        public ExamId: number,
        public Title: string,
        public Description: string,
        public CategoryId: string,
        public SkillId: string,
        public QuestionIds: string,
        public Duration: number,
        public TotalMarks: number,
        public PassMarks: number,
        public Active: boolean,
        public CreatedBy: number,
        public CreatedDate: Date,
        public ModifiedBy: number,
        public ModifiedDate: Date,
        public MarksInclude: string,
        public MarksCount: string,
        public HardPercentage: number,
        public MediumPercentage: number,
        public EasyPercentage: number
    ) { }

}