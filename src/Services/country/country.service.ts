import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../DatabaseEntity/country.entity';


@Injectable()
export class CountryService {

    constructor(
        @InjectRepository(Country)
        private userRepository: Repository<Country>,
    ) { }

    async getCountryList(country: Country): Promise<Country[]> {
        return await this.userRepository.find({ where: [{ Status: 1 }] });
    }

}
