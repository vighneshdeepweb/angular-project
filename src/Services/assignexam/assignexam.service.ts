import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignexam } from '../../DatabaseEntity/assignexam.entity';
import { ExamGroup } from '../../DatabaseEntity/examgroup.entity';
import { ExamFilter } from '../../Models/Examfilter';
import { ExamGroupViewModel } from '../../Models/ExamGroupViewModel';
import { AssignExamViewModel } from '../../Models/AssignExamViewModel';
import { JsonResponse } from 'src/Models/JsonResponse';

@Injectable()
export class AssignexamService {
    constructor(
        @InjectRepository(Assignexam)
        private assignExamRepository: Repository<Assignexam>,
        @InjectRepository(ExamGroup)
        private examGroupRepository: Repository<ExamGroup>,
    ) { }

    async AssignExamToUser(assignExam: ExamGroupViewModel): Promise<Assignexam[]> {

        let examGroupModel = new ExamGroup();
        examGroupModel.ExamId = assignExam.ExamId;
        examGroupModel.ExamDate = assignExam.ExamDate;

        // Check Exam group id on the basis of exam date and examid
        let checkexamgroup = await this.GetExamGroupId(assignExam.ExamId, assignExam.ExamDate);
        let examGroupId: number = 0;
        if (checkexamgroup != undefined) {
            examGroupId = checkexamgroup.ExamGroupId;
        }
        else {
            let groupData = await this.CreateExamGroup(examGroupModel);
            examGroupId = groupData.ExamGroupId;
        }
        if (examGroupId > 0) {
            var userIds = assignExam.UserIds.split(',');
            let assignModel: AssignExamViewModel[] = [];
            if (userIds.length > 0) {
                userIds.forEach(element => {
                    let model = new AssignExamViewModel(examGroupId, Number(element), 0, new Date());
                    assignModel.push(model);
                });
                return await this.assignExamRepository.save(assignModel);
            }
        }
    }
    async GetAssignExamList(filters: ExamFilter): Promise<Assignexam[]> {
        console.log("query","CALL GetAssignedExamList(" + filters.pageno + "," + filters.pagesize + "," + filters.userid + "," + filters.categoryid + "," + filters.skillid + "," + "'" + filters.title + "'" + "," + "'" + filters.date + "'" + ");");
        return await this.assignExamRepository.query("CALL GetAssignedExamList(" + filters.pageno + "," + filters.pagesize + "," + filters.userid + "," + filters.categoryid + "," + filters.skillid + "," + "'" + filters.title + "'" + "," + "'" + filters.date + "'" + ");");
    }

    async DeleteAssignExam(id): Promise<DeleteResult> {
        await this.examGroupRepository.delete(id);
        return await this.assignExamRepository.query("delete from assignexam where examgroupid=" + id + "");
    }

    async GetAssignExamUserList(examid): Promise<Assignexam[]> {
        let data = await this.assignExamRepository.query("call GetAssignedExamUserList(" + examid + ")");
        return data[0];
    }
    // Exam group actions
    async CreateExamGroup(examGroup: ExamGroup): Promise<ExamGroup> {
        return await this.examGroupRepository.save(examGroup);
    }
    async GetExamGroupId(examid: number, examdate: Date) {
        return await this.examGroupRepository.findOne({ where: [{ ExamId: examid, ExamDate: examdate }] })
    }

}
