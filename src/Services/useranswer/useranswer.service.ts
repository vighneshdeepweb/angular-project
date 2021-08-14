import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { useranswer } from '../../DatabaseEntity/useranswer.entity';
import { JsonResponse } from '../../Models/JsonResponse';

@Injectable()
export class UseranswerService {
    constructor(
        @InjectRepository(useranswer)
        private userRepository: Repository<useranswer>,
    ) { }

    async SaveUserAnswers(ua: useranswer): Promise<JsonResponse> {
        try {
            await this.userRepository.save(ua);
            return new JsonResponse("200", "success", "Data saved.", "", "", null);
        }
        catch (e) {
            return new JsonResponse("0", "error", e.message, "", "", null);
        }
    }
    async UpdateUserAnswers(ua: useranswer): Promise<JsonResponse> {
        try {
            await this.userRepository.query("update useranswer set GivenAnswerId='" + ua.GivenAnswerId + "', RemainingTime='" + ua.RemainingTime + "' where UserId=" + ua.UserId + " and ExamId=" + ua.ExamId + " and QuestionId=" + ua.QuestionId + " & ExamGroupId=" + ua.ExamGroupId + "");
            return new JsonResponse("200", "success", "Data updated.", "", "", null);
        }
        catch (e) {
            return new JsonResponse("0", "error", e.message, "", "", null);
        }
    }
    async DeleteUserAnswers(examId, userId): Promise<JsonResponse> {
        try {
            await this.userRepository.query("delete from useranswer where examid=" + examId + " and userid=" + userId + "");
            return new JsonResponse("200", "success", "Data deleted.", "", "", null);
        }
        catch (e) {
            return new JsonResponse("0", "error", e.message, "", "", null);
        }
    }
    async GetExistingUserAnswer(ua: useranswer): Promise<useranswer[]> {
        return await this.userRepository.find({ where: [{ QuestionId: ua.QuestionId, ExamId: ua.ExamId, UserId: ua.UserId }] })
    }

}
