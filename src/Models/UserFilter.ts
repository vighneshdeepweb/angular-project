import { Filters } from "./Filters";
export class UserFilter extends Filters {

    cityid: number = 0;
    stateid: number = 0;
    countryid: number = 0;
    universityid: number = 0;
    username: string = '';
    constructor(pno: number, ps: number, cid: number, sid: number, active: number, date: string, total: number, cityid, stateid, countryid, universityid, username ) {
        super(pno, ps, cid, sid, active, date, total);
        this.cityid = cityid;
        this.stateid = stateid;
        this.countryid = countryid;
        this.universityid = universityid;
        this.username = username;
    }

}