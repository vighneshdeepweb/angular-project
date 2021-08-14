import { Injectable, Param } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from '../../DatabaseEntity/state.entity';

@Injectable()
export class StateService {
    constructor(
        @InjectRepository(State)
        private stateRepository: Repository<State>
    ) { }

    async GetAllState(status: number): Promise<State[]> {
        if (status == undefined || status == -1) {
            return await this.stateRepository.query("select S.*,C.CountryName from State s left join Country C on S.CountryId=C.CountryId");
        }
        else {
            //return await this.stateRepository.find({ where: [{ Active: status }] });
            return await this.stateRepository.query("select S.*,C.CountryName from State s left join Country C on S.CountryId=C.CountryId where S.Active=" + status + "");
        }
    }
    async CreateState(state: State): Promise<State> {
        return await this.stateRepository.save(state);
    }
    async GetStateById(id: number): Promise<State> {
        return await this.stateRepository.findOne({ where: [{ StateId: id }] });
    }
    async GetStateByCountryId(countryid: number): Promise<State[]> {
        return await this.stateRepository.find({ where: [{ CountryId: countryid, Active: true }] });
    }
    async UpdateState(state: State): Promise<UpdateResult> {
        return await this.stateRepository.update(state.StateId, state);
    }
    async DeleteState(id): Promise<DeleteResult> {
        return await this.stateRepository.delete(id);
    }

}
