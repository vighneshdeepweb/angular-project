import { Controller, Post, Get, Delete, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { Skill } from '../../DatabaseEntity/skill.entity';
import { SkillService } from '../../Services/skill/skill.service';
import { JsonResponse } from '../../Models/JsonResponse';
import { AuthGuard } from '@nestjs/passport';
import { skill_category_mapping } from '../../DatabaseEntity/skill_category_mapping.entity';
import { Skill_Category_ViewModel } from '../../Models/Skill_Category_ViewModel';

@Controller('skill')
export class SkillController {

    constructor(private skillService: SkillService) { }
    result: any;

    @UseGuards(AuthGuard('jwt'))
    @Get('getskilllist')
    async GetAllSkill(@Query('status') status): Promise<Skill[]> {
        return await this.skillService.GetAllSkills(status);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createskill')
    async CreateSubject(@Body() skill: Skill): Promise<JsonResponse> {
        this.result = await this.skillService.CreateSkill(skill);
        if (this.result.SkillId > 0) {
            return new JsonResponse("200", "success", "Skill created successfully.", "", this.result.SkillId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "Skill not created.", "", "", null);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id/getskillbyid')
    async GetSkillById(@Param('id') id): Promise<Skill> {
        return await this.skillService.GetSkillById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getskillbyname')
    async GetSkillByName(@Query('name') name: string): Promise<Skill[]> {
        return await this.skillService.GetSkillByName(name);
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('updateskill')
    async update(@Body() skill: Skill_Category_ViewModel): Promise<JsonResponse> {
        return this.skillService.UpdateSkill(skill);
        //return new JsonResponse("200", "success", "Skill updated successfully.", "", this.result.SkillId, null);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('deleteskill')
    async delete(@Query('skillid') skillid, @Query('categoryid') categoryid): Promise<JsonResponse> {
        this.result = this.skillService.DeleteSkill(skillid, categoryid);
        return new JsonResponse("200", "success", "Skill deleted successfully.", "", this.result.SkillId, null);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getskillsbycategoryid')
    async GetSkillsByCategoryId(@Query('categoryid') categoryid, @Query('skillid') skillid): Promise<skill_category_mapping[]> {
        return this.result = this.skillService.GetSkillsByCategoryId(categoryid, skillid);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('getskillsbycategoryids')
    async GetSkillsByCategoryIds(@Query('categoryid') categoryid): Promise<skill_category_mapping[]> {
        return this.result = this.skillService.GetSkillsByCategoryIds(categoryid);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('saveskillcategorymapping')
    async SaveSkillCategoryMapping(@Body() catskillmapping: skill_category_mapping): Promise<JsonResponse> {
        this.result = await this.skillService.SaveSkillCategoryMapping(catskillmapping);
        if (this.result.mapping_id > 0) {
            return new JsonResponse("200", "success", "Skill created successfully.", "", this.result.SkillId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "Skill not created.", "", "", null);
        }
    }


}
