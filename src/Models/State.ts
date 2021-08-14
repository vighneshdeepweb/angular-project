export class State {
    constructor(
        public StateId: number,
        public CountryId: string,
        public StateName: string,
        public Active: boolean,
        public CreatedBy: number,
        public CreatedDate: Date,
        public ModifiedBy: number,
        public ModifiedDate: Date
    ) { }
}