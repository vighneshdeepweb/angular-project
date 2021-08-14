import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../DatabaseEntity/question.entity';
import { QuestionFilter } from '../../Models/QuestionFilters';
import { QuestionViewModel } from '../../Models/QuestionViewModel';
import { difficulty_level } from '../../DatabaseEntity/difficulty_level.entity';
import { AnswerViewModel } from '../../Models/AnswerViewModel';

@Injectable()
export class QuestionService {
    query: string;
    constructor(
        @InjectRepository(Question)
        private queRepository: Repository<Question>,
        @InjectRepository(difficulty_level)
        private levelRepository: Repository<difficulty_level>,
    ) { }

    async GetAllQuestions(status: number): Promise<Question[]> {
        if (status == undefined || status == -1) {
            return await this.queRepository.query("select Q.*,C.CategoryName,S.SkillName from Question Q LEFT JOIN Category C ON Q.CategoryId=C.CategoryId LEFT JOIN Skill S ON Q.SkillId=S.SkillId;");
        }
        else {
            return await this.queRepository.query("select Q.*,C.CategoryName,S.SkillName from Question Q LEFT JOIN Category C ON Q.CategoryId=C.CategoryId LEFT JOIN Skill S ON Q.SkillId=S.SkillId where Q.Active=" + status + ";");
        }
    }
    async GetDifficultyLevel(): Promise<difficulty_level[]> {
        return await this.levelRepository.find();
    }
    async CreateQuestion(que: Question): Promise<Question> {
        return await this.queRepository.save(que);
    }
    async GetQuestionById(id: number): Promise<Question> {
        return await this.queRepository.findOne({ where: [{ QuestionId: id }] });
    }
    async UpdateQuestion(que: Question): Promise<UpdateResult> {

        this.query = "update question set CategoryId=" + que.CategoryId + ",SkillId=" + que.SkillId + ",QuestionText='" + que.QuestionText + "',Marks=" + que.Marks + ",QuestionType='" + que.QuestionType + "',TotalOptions=" + que.TotalOptions + ",IsMultiAnswer=0,Active=" + que.Active + ",ModifiedBy=" + que.ModifiedBy + ",DifficultyLevelID=" + que.DifficultyLevelID + "  where questionId=" + que.QuestionId + "";
        return await this.queRepository.query(this.query);
    }
    async DeleteQuestion(id): Promise<DeleteResult> {
        return await this.queRepository.delete(id);
    }
    async GetQuestionsByFilters(filters: QuestionFilter): Promise<Question[]> {
        return await this.queRepository.query("CALL GetQuestionList (" + filters.pageno + "," + filters.pagesize + "," + filters.categoryid + "," + filters.skillid + "," + "'" + filters.questiontext + "'" + "," + "'" + filters.questiontype + "'" + "," + "'" + filters.date + "'" + ");");
    }
    async GetQuestionsByCategoryAndSkill(categoryids: string, skillids: string): Promise<Question[]> {
        return await this.queRepository.query("select Q.*,C.CategoryName,S.SkillName from Question Q LEFT JOIN Category C ON Q.CategoryId=C.CategoryId LEFT JOIN Skill S ON Q.SkillId=S.SkillId where Q.CategoryId in(" + categoryids + ") and Q.SkillID in(" + skillids + ") and Q.Active=1");
    }

    async GetQuestionsByExamId(examid: number, userid: number, examGroupId: number): Promise<QuestionViewModel[]> {
        let questionViewModel: QuestionViewModel[] = [];
        let result = await this.queRepository.query("Call GetQuestionListByExamId(" + examid + "," + userid + "," + examGroupId + ");");
        if (result.length > 0) {
            let questionList = result[0];
            let answerList = result[1];
            if (questionList.length > 0 && answerList.length > 0) {
                questionList.forEach(element => {
                    let queModel = new QuestionViewModel(
                        element.QuestionId,
                        element.CategoryId,
                        element.SkillId,
                        element.QuestionText,
                        element.Marks,
                        element.QuestionType,
                        element.TotalOptions,
                        element.IsMultiAnswer,
                        element.Active,
                        element.CreatedBy,
                        element.CreatedDate,
                        element.ModifiedBy,
                        element.ModifiedDate,
                        element.RightAnsIndex,
                        //result.map(answerList.filter(a => a.QuestionId == element.QuestionId))
                        answerList.filter(a => a.QuestionId == element.QuestionId)
                    );
                    answerList.forEach(anselement => {
                        anselement.IsSelected = anselement.IsSelected == 1 ? true : false;
                    });
                    questionViewModel.push(queModel)
                });

            }
        }
        return await questionViewModel;
    }
}
