export class University {
    constructor(
        public UniversityId: number,
        public CityId: string,
        public StateId: string,
        public CountryId: string,
        public UniversityName: string,
        public Active: boolean,
        public CreatedBy: number,
        public CreatedDate: Date,
        public ModifiedBy: number,
        public ModifiedDate: Date
    ) { }
}