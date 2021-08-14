import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { attemptedexams } from '../../DatabaseEntity/attemptedexams.entity';
import { JsonResponse } from '../../Models/JsonResponse';



@Injectable()
export class AttemptedexamsService {
    constructor(
        @InjectRepository(attemptedexams)
        private attemptedexamRepository: Repository<attemptedexams>,
    ) { }

    async SaveAttemptedExam(ae: attemptedexams): Promise<JsonResponse> {
        try {
            await this.attemptedexamRepository.save(ae);
            return new JsonResponse("200", "success", "Data saved.", "", "", null);
        }
        catch (e) {
            return new JsonResponse("0", "error", e.message, "", "", null);
        }
    }

}
