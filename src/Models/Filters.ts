export class Filters {
    public pageno: number;
    public pagesize: number;
    public categoryid: number;
    public skillid: number;
    public active: number;
    public date: string='';
    public totalcount: number = 0
    constructor(pno: number, ps: number, cid: number, sid: number, active: number, date: string, total: number) {
        this.pageno = pno;
        this.pagesize = ps;
        this.categoryid = cid;
        this.skillid = sid;
        this.active = active;
        this.date = date;
        this.totalcount = total;
    }


}