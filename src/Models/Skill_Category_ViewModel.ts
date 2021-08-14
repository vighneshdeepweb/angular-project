export class Skill_Category_ViewModel {

    constructor(
        public SkillId: number,
        public CategoryId: string,
        public SkillName: string,
        public CategoryName: string,
        public Description: string,
        public Active: boolean,
        public CreatedBy: number,
        public CreatedDate: Date,
        public ModifiedBy: number,
        public ModifiedDate: Date
    ) { }

}