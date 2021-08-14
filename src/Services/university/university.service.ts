import { Injectable, Param } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from '../../DatabaseEntity/university.entity';

@Injectable()
export class UniversityService {
    constructor(
        @InjectRepository(University)
        private universityRepository: Repository<University>
    ) { }

    async GetAllUniversity(status: number): Promise<University[]> {
        if (status == undefined || status == -1) {
            return await this.universityRepository.query("select U.*,C.CityName,S.StateName,Co.CountryName from University U left join City C on U.CityId=C.CityId left join State S on U.StateId=S.StateId left join Country Co ON U.CountryId=Co.CountryId");
        }
        else {
            //return await this.stateRepository.find({ where: [{ Active: status }] });
            return await this.universityRepository.query("select U.*,C.CityName,S.StateName,Co.CountryName from University U left join City C on U.CityId=C.CityId left join State S on U.StateId=S.StateId left join Country Co ON U.CountryId=Co.CountryId where U.Active=" + status + "");
        }
    }
    async CreateUniversity(university: University): Promise<University> {
        return await this.universityRepository.save(university);
    }
    async GetUniversityById(id: number): Promise<University> {
        return await this.universityRepository.findOne({ where: [{ UniversityId: id }] });
    }

    async UpdateUniversity(university: University): Promise<UpdateResult> {
        return await this.universityRepository.update(university.UniversityId, university);
    }
    async DeleteUniversity(id): Promise<DeleteResult> {
        return await this.universityRepository.delete(id);
    }
    async GetUniversityByCityId(cityid: number): Promise<University[]> {
        return await this.universityRepository.find({ where: [{ CityId: cityid, Active: true }] });
    }

}
