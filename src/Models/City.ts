export class City {
    constructor(
        public CityId: number,
        public StateId: string,
        public CountryId: string,
        public CityName: string,
        public Active: boolean,
        public CreatedBy: number,
        public CreatedDate: Date,
        public ModifiedBy: number,
        public ModifiedDate: Date
    ) { }
}