export class QuestionFilter {
    constructor(
        public pageno: number,
        public pagesize: number,
        public categoryid: number,
        public skillid: number,
        public questiontext: string,
        public questiontype: string,
        public date: string,
        public totalcount: number = 0
    ) { }
}