import { Injectable, Param } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from '../../DatabaseEntity/city.entity';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>
    ) { }

    async GetAllCity(status: number): Promise<City[]> {
        if (status == undefined || status == -1) {
            return await this.cityRepository.query("select C.*,S.StateName,Co.CountryName from City C left join State S on C.StateId=S.StateId left join Country Co ON C.CountryId=Co.CountryId");
        }
        else {
            //return await this.stateRepository.find({ where: [{ Active: status }] });
            return await this.cityRepository.query("select C.*,S.StateName,Co.CountryName from City C left join State S on C.StateId=S.StateId left join Country Co ON C.CountryId=Co.CountryId where C.Active=" + status + "");
        }
    }
    async CreateCity(city: City): Promise<City> {
        return await this.cityRepository.save(city);
    }
    async GetCityById(id: number): Promise<City> {
        return await this.cityRepository.findOne({ where: [{ CityId: id }] });
    }

    async UpdateCity(city: City): Promise<UpdateResult> {
        return await this.cityRepository.update(city.CityId, city);
    }
    async DeleteCity(id): Promise<DeleteResult> {
        return await this.cityRepository.delete(id);
    }
    async GetCityByStateId(stateid: number): Promise<City[]> {
        return await this.cityRepository.find({ where: [{ StateId: stateid, Active: true }] });
    }

}
