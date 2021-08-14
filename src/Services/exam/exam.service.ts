import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exams } from '../../DatabaseEntity/exams.entity';
import { include_marks } from '../../DatabaseEntity/marksincludeinexam.entity';
import { Assignexam } from '../../DatabaseEntity/assignexam.entity';
import { ExamFilter } from '../../Models/Examfilter';
import { ResultViewModel } from '../../Models/ResultViewModel';
import { ExamViewModel } from '../../Models/ExamViewModel';
import { AttemptedExamViewModel } from '../../Models/AttemptedExamModel';
import { DownloadResultViewModel } from '../../Models/DownloadResultViewModel';

@Injectable()
export class ExamService {

    constructor(
        @InjectRepository(Exams)
        private examRepository: Repository<Exams>,
        @InjectRepository(include_marks)
        private marksRepository: Repository<include_marks>
    ) { }

    async GetAllExams(status: number): Promise<Exams[]> {
        if (status == undefined || status == -1) {
            return await this.examRepository.find();
        }
        else {
            return await this.examRepository.find({ where: [{ Active: status }] });
        }
    }
    async CreateExam(exam: Exams): Promise<Exams> {
        return await this.examRepository.save(exam);
    }

    async SaveMarksInExam(marks: include_marks): Promise<include_marks> {
        return await this.marksRepository.save(marks);
    }


    async GetExamById(id: number): Promise<Exams> {
        return await this.examRepository.findOne({ where: [{ ExamId: id }] });
    }

    async GetExamByUserIdAndExamId(examId: number, userId: number, examgroupId: number): Promise<Exams> {
        let query = "select e.*,es.Status,(select Min(RemainingTime) from useranswer where userid=" + userId + " and examgroupid=" + examgroupId + " ) as RemainingTime from exams e left join attemptedexams ae on e.ExamId=ae.ExamId and UserId=" + userId + " and ExamGroupId=" + examgroupId + " left join exam_status es on ae.ExamStatusId=es.StatusId where e.examid=" + examId + ";"
        return await this.examRepository.query(query);
    }

    async UpdateExam(exam: Exams): Promise<UpdateResult> {
        //this.marksRepository.query("delete from include_marks where examid=" + exam.ExamId + "");
        return await this.examRepository.update(exam.ExamId, exam);
    }

    async DeleteIncludeMarks(examId: number): Promise<include_marks> {
        return await this.marksRepository.query("delete from include_marks where examid=" + examId + "");
    }

    async DeleteExam(id): Promise<DeleteResult> {
        this.marksRepository.query("delete from include_marks where examid=" + id + "");
        this.marksRepository.query("delete from assignexam where examid=" + id + "");
        return await this.examRepository.delete(id);
    }
    async GetExamList(filters: ExamFilter): Promise<Exams[]> {

        //console.log("queryexam", "CALL GetExamList (" + filters.pageno + "," + filters.pagesize + "," + filters.categoryid + "," + filters.skillid + "," + "'" + filters.title + "'" + "," + "'" + filters.date + "'" + "," + filters.active + ");");
        return await this.examRepository.query("CALL GetExamList (" + filters.pageno + "," + filters.pagesize + "," + filters.categoryid + "," + filters.skillid + "," + "'" + filters.title + "'" + "," + "'" + filters.date + "'" + "," + filters.active + ");");
    }
    async GetResult(examid: number, userid: number, examgroupid: number): Promise<ResultViewModel> {
        //console.log("result query","CALL GetResult(" + examid + "," + userid + "," + examgroupid + ")");
        return await this.examRepository.query("CALL GetResult(" + examid + "," + userid + "," + examgroupid + ")");
    }
    async GetAttemptedExamList(): Promise<AttemptedExamViewModel[]> {
        return await this.examRepository.query("CALL GetAttemptedExamList();");
    }

    async GetMarksByExamId(id: number): Promise<include_marks[]> {
        return await this.marksRepository.find({ where: [{ ExamId: id }] });
    }
    async DownloadResult(examgroupid: number): Promise<DownloadResultViewModel[]> {
        return await this.marksRepository.query("CALL DownloadResult(" + examgroupid + ");");
    }
    async GetQuestionCount(categoryid: string): Promise<number> {
        return await this.marksRepository.query("select count(*) as TotalCount from question where categoryid in (" + categoryid + ");");
    }



}
