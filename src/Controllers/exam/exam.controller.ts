import { Controller, Post, Get, Body, Param, Put, Delete, Query, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express'
import { Exams } from '../../DatabaseEntity/exams.entity';
import { Assignexam } from '../../DatabaseEntity/assignexam.entity';
import { useranswer } from '../../DatabaseEntity/useranswer.entity';
import { attemptedexams } from '../../DatabaseEntity/attemptedexams.entity';
import { include_marks } from '../../DatabaseEntity/marksincludeinexam.entity';
import { ExamService } from '../../Services/exam/exam.service';
import { AssignexamService } from '../../Services/assignexam/assignexam.service';
import { UseranswerService } from '../../Services/useranswer/useranswer.service';
import { AttemptedexamsService } from '../../Services/attemptedexams/attemptedexams.service';
import { JsonResponse } from '../../Models/JsonResponse';
import { ExamFilter } from '../../Models/Examfilter';
import { AuthGuard } from '@nestjs/passport';
import { ResultViewModel } from '../../Models/ResultViewModel';
import { ExamViewModel } from '../../Models/ExamViewModel';
import { AttemptedExamViewModel } from '../../Models/AttemptedExamModel';
import { ExamGroupViewModel } from '../../Models/ExamGroupViewModel';
import { DownloadResultViewModel } from '../../Models/DownloadResultViewModel';


@Controller('exam')
export class ExamController {
    constructor(private examService: ExamService, private assignExamService: AssignexamService, private userAnsService: UseranswerService, private attemptedExamService: AttemptedexamsService) { }
    result: any;

    @UseGuards(AuthGuard('jwt'))
    @Get('getexamlist')
    async GetAllExams(@Query('status') status): Promise<Exams[]> {
        return await this.examService.GetAllExams(status);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createexam')
    async CreateExam(@Body() exam: ExamViewModel): Promise<JsonResponse> {
        this.result = await this.examService.CreateExam(exam);
        if (this.result.ExamId > 0) {
            let marksdata = exam.MarksInclude.split(',');
            let nodata = exam.MarksCount.split(',');
            for (let i in marksdata) {
                let model = new include_marks();
                model.ExamId = this.result.ExamId;
                model.MarksNo = Number(marksdata[i]);
                model.MarksCount = Number(nodata[i]);
                model.HardQuestionCount = (model.MarksCount * exam.HardPercentage) / 100 < 1 ? 0 : Math.round(model.MarksCount * exam.HardPercentage) / 100;
                model.MediumQuestionCount = (model.MarksCount * exam.MediumPercentage) / 100 < 1 ? 0 : Math.round(model.MarksCount * exam.MediumPercentage) / 100;
                model.EasyQuestionCount = (model.MarksCount * exam.EasyPercentage) / 100 < 1 ? 0 : Math.round(model.MarksCount * exam.EasyPercentage) / 100;
                await this.examService.SaveMarksInExam(model);
            }
            return new JsonResponse("200", "success", "Exam created successfully.", "", this.result.ExamId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "Exam not created.", "", "", null);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getexambyid/:id')
    async GetExamById(@Param('id') id): Promise<Exams> {
        return await this.examService.GetExamById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getexambyexamidanduserid')
    async GetExamByUserIdAndExamId(@Query('examid') examid, @Query('userid') userid, @Query('examgroupid') examgroupid): Promise<Exams> {
        return await this.examService.GetExamByUserIdAndExamId(examid, userid, examgroupid);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('updateexam/:id')
    async UpdateExam(@Param('id') id, @Body() exam: ExamViewModel): Promise<JsonResponse> {
        let ex = new Exams();
        ex.ExamId = exam.ExamId;
        ex.Title = exam.Title;
        ex.Description = exam.Description;
        ex.CategoryId = exam.CategoryId;
        ex.SkillId = exam.SkillId;
        ex.QuestionIds = exam.QuestionIds;
        ex.Duration = exam.Duration;
        ex.HardPercentage = exam.HardPercentage;
        ex.MediumPercentage = exam.MediumPercentage;
        ex.EasyPercentage = exam.EasyPercentage;
        ex.TotalMarks = exam.TotalMarks;
        ex.PassMarks = exam.PassMarks;
        ex.Active = exam.Active;
        ex.CreatedBy = exam.CreatedBy;
        ex.CreatedDate = exam.CreatedDate;
        ex.ModifiedBy = exam.ModifiedBy;
        ex.ModifiedDate = exam.ModifiedDate;
        this.result = this.examService.UpdateExam(ex);

        let marksdata = exam.MarksInclude.split(',');
        let nodata = exam.MarksCount.split(',');
        await this.examService.DeleteIncludeMarks(exam.ExamId);
        for (let i = 0; i < marksdata.length; i++) {
            let model = new include_marks();
            model.ExamId = exam.ExamId;
            model.MarksNo = Number(marksdata[i]);
            model.MarksCount = Number(nodata[i]);
            model.HardQuestionCount = (model.MarksCount * exam.HardPercentage) / 100 < 1 ? 0 : Math.round(model.MarksCount * exam.HardPercentage) / 100;
            model.MediumQuestionCount = (model.MarksCount * exam.MediumPercentage) / 100 < 1 ? 0 : Math.round(model.MarksCount * exam.MediumPercentage) / 100;
            model.EasyQuestionCount = (model.MarksCount * exam.EasyPercentage) / 100 < 1 ? 0 : Math.round(model.MarksCount * exam.EasyPercentage) / 100;
            await this.examService.SaveMarksInExam(model);
        }
        return new JsonResponse("200", "success", "Exam updated successfully.", "", this.result.ExamId, null);

    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('deleteexam/:id')
    async DeleteExam(@Param('id') id): Promise<JsonResponse> {
        this.result = this.examService.DeleteExam(id);
        return new JsonResponse("200", "success", "Exam deleted successfully.", "", this.result.ExamId, null);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('getexamlist')
    async GetExamList(@Body() filters: ExamFilter): Promise<Exams[]> {
        return await this.examService.GetExamList(filters);
    }


    //#region Assign Exam 
    @UseGuards(AuthGuard('jwt'))
    @Post('assignexamtouser')
    async AssignExamToUser(@Body() assignExam: ExamGroupViewModel): Promise<JsonResponse> {
        this.result = await this.assignExamService.AssignExamToUser(assignExam);
        if (this.result.length > 0) {
            return new JsonResponse("200", "success", "Exam assigned successfully.", "", this.result.AssignExamId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "Exam not assigned.", "", "", null);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('getassignexamlist')
    async GetAssignExamList(@Body() filters: ExamFilter): Promise<Assignexam[]> {
        return await this.assignExamService.GetAssignExamList(filters);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('saveuseranswer')
    async SaveUserAnswers(@Body() userAns: useranswer): Promise<JsonResponse> {
        return await this.userAnsService.SaveUserAnswers(userAns);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('updateuseranswer')
    async UpdateUserAnswers(@Body() userAns: useranswer): Promise<JsonResponse> {
        return await this.userAnsService.UpdateUserAnswers(userAns);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('deleteuseranswer')
    async DeleteUserAnswers(@Query('examid') examid, @Query('userid') userid): Promise<JsonResponse> {
        return await this.userAnsService.DeleteUserAnswers(examid, userid);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('getexistinguseranswer')
    async GetExistingUserAnswer(@Body() userAns: useranswer): Promise<useranswer[]> {
        return await this.userAnsService.GetExistingUserAnswer(userAns);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getuserresult')
    async GetUserResult(@Query('examid') examid, @Query('userid') userid, @Query('examgroupid') examgroupid): Promise<ResultViewModel> {
        let result = await this.examService.GetResult(examid, userid, examgroupid);
        return result[0];
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('saveuserattemptedexam')
    async SaveAttemptedExams(@Body() exam: attemptedexams): Promise<JsonResponse> {
        return await this.attemptedExamService.SaveAttemptedExam(exam);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getexammarks/:examid')
    async GetExamMarksByExamId(@Param('examid') id): Promise<include_marks[]> {
        return await this.examService.GetMarksByExamId(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('deleteassignexam')
    async DeleteAssignExam(@Query('examgroupid') examgroupid): Promise<JsonResponse> {
        this.assignExamService.DeleteAssignExam(examgroupid);
        return new JsonResponse("200", "success", "Assigned Exams deleted successfully.", "", "", null);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('getassignexamuserlist')
    async GetAssignExamUserList(@Query('examid') examid): Promise<Assignexam[]> {
        return this.assignExamService.GetAssignExamUserList(examid);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('getattemptedexamlist')
    async GetAttemptedExamList(): Promise<AttemptedExamViewModel[]> {
        return this.examService.GetAttemptedExamList();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getquestioncount')
    async GetQuestionCount(@Query('categoryid') categoryid): Promise<number> {
        return this.examService.GetQuestionCount(categoryid);
    }

    //@UseGuards(AuthGuard('jwt'))
    @Get('downloadresult')
    async DownloadResult(@Query('examgroupid') examgroupid, @Res() res: Response) {
        res.header('Content-Type', 'text/csv');
        res.header('Content-disposition', 'attachment; filename=test.csv');
        var data = await this.examService.DownloadResult(examgroupid);
        if (data != null) {
            console.log("data",data);
            const converter = require('json-2-csv');
            const fs = require('fs');
            const csv = await converter.json2csvAsync(data);
            console.log("-------csv------", csv);
            res.send(csv);
        }
        else {
            res.send(null);
        }
    }




    // @Get('getexamgroup')
    // async GetExamGroupId(@Query('examid') examid, @Query('date') date): Promise<Assignexam> {
    //     //return this.examService.GetExamGroupId(examid, date);
    // }

    //#endregion
}
