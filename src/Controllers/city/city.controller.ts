import { Controller, Post, Get, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { City } from '../../DatabaseEntity/city.entity';
import { CityService } from '../../Services/city/city.service';
import { JsonResponse } from '../../Models/JsonResponse';
import { AuthGuard } from '@nestjs/passport';

@Controller('city')
export class CityController {
    constructor(private cityService: CityService) { }
    result: any;

    @UseGuards(AuthGuard('jwt'))
    @Get('getcitylist')
    async GetAllCities(@Query('status') status): Promise<City[]> {
        return await this.cityService.GetAllCity(status);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createcity')
    async CreateCity(@Body() city: City): Promise<JsonResponse> {
        this.result = await this.cityService.CreateCity(city);
        if (this.result.CityId > 0) {
            return new JsonResponse("200", "success", "City created successfully.", "", this.result.CityId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "City not created.", "", "", null);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getcitybyid/:id')
    async GetCityById(@Param('id') id): Promise<City> {
        return await this.cityService.GetCityById(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('updatecity/:id')
    async update(@Param('id') id, @Body() cityData: City): Promise<JsonResponse> {
        this.result = this.cityService.UpdateCity(cityData);
        return new JsonResponse("200", "success", "City updated successfully.", "", this.result.CityId, null);

    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('deletecity/:id')
    async delete(@Param('id') id): Promise<JsonResponse> {
        this.result = this.cityService.DeleteCity(id);
        return new JsonResponse("200", "success", "City deleted successfully.", "", this.result.CityId, null);
    }

    @Get('getcitybystateid/:stateid')
    async GetCityByStateId(@Param('stateid') id): Promise<City[]> {
        return await this.cityService.GetCityByStateId(id);
    }

}
