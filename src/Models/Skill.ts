export class Skill {
    constructor(

        public SkillId: number,
        public CategoryId: string,
        public CategoryName: string,
        public SkillName: string,
        public Description: string,
        public Active: boolean,
        public CreatedBy: number,
        public CreatedDate: Date,
        public ModifiedBy: number,
        public ModifiedDate: Date



    ) { }
}