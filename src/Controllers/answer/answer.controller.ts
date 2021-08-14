import { Controller, Post, Get, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { Answer } from '../../DatabaseEntity/answer.entity';
import { AnswerService } from '../../Services/answer/answer.service';
import { JsonResponse } from '../../Models/JsonResponse';

@Controller('answer')
export class AnswerController {

    constructor(private ansService: AnswerService) { }
    result: any;
    @Get('getanswerlist')
    async GetAllAnswers(): Promise<Answer[]> {
        return await this.ansService.GetAllAnswers();
    }

    @Get('getanswersbyquestionid/:questionid')
    async GetAnswersByQuestionId(@Param('questionid') questionid): Promise<Answer[]> {
        return await this.ansService.GetAnswersByQuestionId(questionid);
    }

    @Post('createanswer')
    async CreateAnswer(@Body() answer: Answer[]): Promise<JsonResponse> {
       
        this.result = await this.ansService.CreateAnswer(answer);
        if (this.result.status_code == "200") {
            return new JsonResponse("200", "success", "Answer created successfully.", "", this.result.AnswerId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "Answer not created.", "", "", null);
        }
    }
    @Get('getanswerbyid/:id')
    async GetAnswerById(@Param('id') id): Promise<Answer> {
        return await this.ansService.GetAnswerById(id);
    }
    @Put('updateanswer/:id')
    async UpdateAnswer(@Param('id') id, @Body() answerData: Answer): Promise<JsonResponse> {
        this.result = this.ansService.UpdateAnswer(answerData);
        return new JsonResponse("200", "success", "Answer updated successfully.", "", "", null);

    }
    @Delete('deleteanswer/:id')
    async DeleteAnswer(@Param('id') id): Promise<JsonResponse> {
        this.result = this.ansService.DeleteAnswer(id);
        return new JsonResponse("200", "success", "Answer deleted successfully.", "", "", null);
    }


}
