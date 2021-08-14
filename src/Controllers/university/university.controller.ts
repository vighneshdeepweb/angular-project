import { Controller, Post, Get, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { University } from '../../DatabaseEntity/university.entity';
import { UniversityService } from '../../Services/university/university.service';
import { JsonResponse } from '../../Models/JsonResponse';
import { AuthGuard } from '@nestjs/passport';

@Controller('university')
export class UniversityController {
    constructor(private universityService: UniversityService) { }
    result: any;

    @UseGuards(AuthGuard('jwt'))
    @Get('getuniversitylist')
    async GetAllUniversity(@Query('status') status): Promise<University[]> {
        return await this.universityService.GetAllUniversity(status);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createuniversity')
    async CreateUniversity(@Body() university: University): Promise<JsonResponse> {
        this.result = await this.universityService.CreateUniversity(university);
        if (this.result.UniversityId > 0) {
            return new JsonResponse("200", "success", "University created successfully.", "", this.result.UniversityId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "University not created.", "", "", null);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getuniversitybyid/:id')
    async GetUniversityById(@Param('id') id): Promise<University> {
        return await this.universityService.GetUniversityById(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('updateuniversity/:id')
    async update(@Param('id') id, @Body() universityData: University): Promise<JsonResponse> {
        this.result = this.universityService.UpdateUniversity(universityData);
        return new JsonResponse("200", "success", "University updated successfully.", "", this.result.UniversityId, null);

    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('deleteuniversity/:id')
    async delete(@Param('id') id): Promise<JsonResponse> {
        this.result = this.universityService.DeleteUniversity(id);
        return new JsonResponse("200", "success", "University deleted successfully.", "", this.result.UniversityId, null);
    }

    @Get('getuniversitybycityid/:cityid')
    async GetCityByStateId(@Param('cityid') id): Promise<University[]> {
        return await this.universityService.GetUniversityByCityId(id);
    }
}
