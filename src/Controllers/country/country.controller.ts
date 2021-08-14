import { Controller, Get, Body } from '@nestjs/common';
import { Country } from '../../DatabaseEntity/country.entity';
import { CountryService } from '../../Services/country/country.service';



@Controller('country')
export class CountryController {

    constructor(private countryservice: CountryService) { }

    @Get('GetCountryList')
    async GetCountryList(country: Country): Promise<Country[]> {
        return await this.countryservice.getCountryList(country);
        
    }

}
