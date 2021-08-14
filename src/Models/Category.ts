export class Category {
    constructor(
        public CategoryId: number,
        public CategoryName: string,
        public Description: string,
        public Active: boolean,
        public CreatedBy: number,
        public CreatedDate: Date,
        public ModifiedBy: number,
        public ModifiedDate: Date

    ) { }
}