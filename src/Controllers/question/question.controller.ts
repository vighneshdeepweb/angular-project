import { Controller, Post, Get, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { Question } from '../../DatabaseEntity/question.entity';
import { difficulty_level } from '../../DatabaseEntity/difficulty_level.entity';
import { QuestionService } from '../../Services/question/question.service';
import { JsonResponse } from '../../Models/JsonResponse';
import { QuestionFilter } from '../../Models/QuestionFilters';
import { AuthGuard } from '@nestjs/passport';
import { QuestionViewModel } from '../../Models/QuestionViewModel';

@Controller('question')
export class QuestionController {
    constructor(private queService: QuestionService) { }
    result: any;

    @UseGuards(AuthGuard('jwt'))
    @Get('getquestionlist')
    async GetAllQuestions(@Query('status') status): Promise<Question[]> {
        return await this.queService.GetAllQuestions(status);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createquestion')
    async CreateQuestion(@Body() question: Question): Promise<JsonResponse> {
        this.result = await this.queService.CreateQuestion(question);
        if (this.result.QuestionId > 0) {
            return new JsonResponse("200", "success", "Question created successfully.", "", this.result.QuestionId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "Question not created.", "", "", null);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getquestionbyid/:id')
    async GetQuestionById(@Param('id') id): Promise<Question> {
        return await this.queService.GetQuestionById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('updatequestion/:id')
    async UpdateQuestion(@Param('id') id, @Body() questionData: Question): Promise<JsonResponse> {
        this.result = this.queService.UpdateQuestion(questionData);
        return new JsonResponse("200", "success", "Question updated successfully.", "", "", null);

    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('deletequestion/:id')
    async DeleteQuestion(@Param('id') id): Promise<JsonResponse> {
        this.result = this.queService.DeleteQuestion(id);
        return new JsonResponse("200", "success", "Question deleted successfully.", "", "", null);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('getquestionsbyfilter')
    async GetQuestionsByFilters(@Body() filters: QuestionFilter): Promise<Question[]> {
        return await this.queService.GetQuestionsByFilters(filters);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('getquestionsbycategoryandskill')
    async GetQuestionsByCategoryAndSkill(@Body() params): Promise<Question[]> {
        return await this.queService.GetQuestionsByCategoryAndSkill(params[0].categoryids, params[0].skillids);
    }


    //@UseGuards(AuthGuard('jwt'))
    @Get('getquestionsbyexamid')
    async GetQuestionsByExamId(@Query('examid') examid, @Query('userid') userid, @Query('examgroupid') examGroupId): Promise<QuestionViewModel[]> {
        let queList = await this.queService.GetQuestionsByExamId(examid, userid, examGroupId);
        return queList;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getdifficultylevellist')
    async GetDifficultyLevel(): Promise<difficulty_level[]> {
        return await this.queService.GetDifficultyLevel();
    }

}
