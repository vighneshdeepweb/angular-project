import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../../DatabaseEntity/answer.entity';
import { JsonResponse } from '../../Models/JsonResponse';

@Injectable()
export class AnswerService {
    result: any;
    constructor(
        @InjectRepository(Answer)
        private ansRepository: Repository<Answer>,
    ) { }

    async GetAllAnswers(): Promise<Answer[]> {
        return await this.ansRepository.find();
    }
    async CreateAnswer(ans: Answer[]): Promise<JsonResponse> {
        try {
            ans.forEach(item => {
                if (item.AnswerId > 0) {
                    this.ansRepository.update(item.AnswerId, item);
                }
                else {
                    this.ansRepository.save(item);
                }
            });
            // this.result = this.ansRepository.query('INSERT INTO answer (QuestionId,AnswerText,IsRightAnswer ) VALUES ?',
            //     [ans.map(item => [item.QuestionId, item.AnswerText, item.IsRightAnswer])])
            return new JsonResponse("200", "success", "Answer created.", "", "", null);
        }
        catch (e) {
            //console.log("Error", e);
        }

    }
    async GetAnswerById(id: number): Promise<Answer> {
        return await this.ansRepository.findOne({ where: [{ AnswerId: id }] });
    }
    async GetAnswersByQuestionId(questionId: number): Promise<Answer[]> {
        return await this.ansRepository.find({ where: [{ QuestionId: questionId }] });
    }
    async UpdateAnswer(que: Answer): Promise<UpdateResult> {
        return await this.ansRepository.update(que.AnswerId, que);
    }
    async DeleteAnswer(id): Promise<DeleteResult> {
        return await this.ansRepository.delete(id);
    }

}
