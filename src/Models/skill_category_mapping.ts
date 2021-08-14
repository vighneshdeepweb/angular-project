export class skill_category_mapping {
    constructor(
        public mapping_id: number,
        public SkillId: number,
        public CategoryId: number,
        public Active: boolean,
        public CreatedBy: number,
        public CreatedDate: Date,
        public ModifiedBy: number,
        public ModifiedDate: Date
    ) { }
}