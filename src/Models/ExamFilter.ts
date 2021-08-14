import { Filters } from "./Filters";
export class ExamFilter extends Filters {

    title: string;
    userid: number;
    constructor(pno: number, ps: number, cid: number, sid: number, active: number, date: string, total: number, title: string, userid: number) {
        super(pno, ps, cid, sid, active, date, total);
        this.title = title;
        this.userid = userid;

    }

}