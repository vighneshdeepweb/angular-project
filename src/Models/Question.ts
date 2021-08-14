import { Answer } from './Answer';

export class Question {

    constructor(

        public QuestionId: number,
        public CategoryId: string,
        public SkillId: string,
        public QuestionText: string,
        public Marks: number,
        public QuestionType: string,
        public TotalOptions: string,
        public IsMultiAnswer: boolean,
        public Active: boolean,
        public CreatedBy: number,
        public CreatedDate: Date,
        public ModifiedBy: number,
        public ModifiedDate: Date,
        public RightAnsIndex: number,
        public AnswerList: Array<Answer>,
        public selectedAnswer: string,
        public IsAttempted: boolean,
        public DifficultyLevelID: string

    ) { }

}