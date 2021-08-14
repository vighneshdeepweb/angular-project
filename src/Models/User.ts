export class User {
    constructor(
        public UserId: number,
        public RoleId: number,
        public FirstName: string,
        public LastName: string,
        public Email: string,
        public Password: string,
        public CountryId: string,
        public StateId: string,
        public CityId: string,
        public UniversityId: string,
        public Active: boolean,
        public CreatedDate: Date,
        public MobileNo: string,
        public HomeTown: string,
        public PercentageIn10th:string,
        public PercentageIn12th:string,
        public PercentageInGraduation:string,
        public PercentageInPG:string,
        public InterestedSkills:string

    ) { }
}