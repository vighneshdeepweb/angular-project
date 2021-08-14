import { Controller, Post, Get, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { State } from '../../DatabaseEntity/state.entity';
import { StateService } from '../../Services/state/state.service';
import { JsonResponse } from '../../Models/JsonResponse';
import { AuthGuard } from '@nestjs/passport';

@Controller('state')
export class StateController {
    constructor(private stateService: StateService) { }
    result: any;

    @UseGuards(AuthGuard('jwt'))
    @Get('getstatelist')
    async GetAllStates(@Query('status') status): Promise<State[]> {
        return await this.stateService.GetAllState(status);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createstate')
    async CreateState(@Body() state: State): Promise<JsonResponse> {
        this.result = await this.stateService.CreateState(state);
        if (this.result.StateId > 0) {
            return new JsonResponse("200", "success", "State created successfully.", "", this.result.StateId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "State not created.", "", "", null);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getstatebyid/:id')
    async GetStateById(@Param('id') id): Promise<State> {
        return await this.stateService.GetStateById(id);
    }

    //@UseGuards(AuthGuard('jwt'))
    @Get('getstatebycountryid/:countryid')
    async GetStateByCountryId(@Param('countryid') id): Promise<State[]> {
        return await this.stateService.GetStateByCountryId(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('updatestate/:id')
    async update(@Param('id') id, @Body() stateData: State): Promise<JsonResponse> {
        this.result = this.stateService.UpdateState(stateData);
        return new JsonResponse("200", "success", "State updated successfully.", "", this.result.StateId, null);

    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('deletestate/:id')
    async delete(@Param('id') id): Promise<JsonResponse> {
        this.result = this.stateService.DeleteState(id);
        return new JsonResponse("200", "success", "State deleted successfully.", "", this.result.StateId, null);
    }


}
